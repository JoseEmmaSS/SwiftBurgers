//Importar modelo
const Propietario = require('../models/Propietario')
// Importar libreria 'BYCRYPT'
const bcryp = require('bcrypt')
// Importar libreria 'jsonwebtoken'
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
const { propfind } = require('../routes/routes')

dotenv.config({ path: '.env' })

const inicio = (req, res) => {
    res.send('Rutas funcionando')
}

// Login
const loginPropietario = async (req, res) => {
    try {
        const { correo, password } = req.body
        // Validar campos completos
        if (!(correo && password)) {
            return res.status(400).send('Complete todos los campos');
        }
        // Validar si el usuario existe
        const propietario = await Propietario.findOne({ correo })

        if (propietario && (await bcryp.compare(password, propietario.password))) {
            // Crear token
            const token = jwt.sign(
                { idPropietario: propietario.idPropietario, correo },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // Guardar token
            await propietario.update({ token });

            // Respuesta correcta
            return res.status(200).json(propietario);
        }
        // Respuesta
        return res.status(400).send("Credenciales Invalidas");

    } catch (error) {
        console.log(error)
    }
}

const cerrarSesion = async (req, res) => {
    const {idPropietario} = req.params;

    
}


const getPropietario = async (req, res) => {
    const propietario = await Propietario.findAll()
    res.json(propietario)
}

const getPropietarioById = async (req, res) => {
    const { idPropietario } = req.params;
    const propietario = await Propietario.findByPk(idPropietario)

    if (propietario) {
        res.json(propietario)
    } else {
        res.status(404).json({
            msg: `Inventario no encontrado con id: ${idPropietario}`
        })
    }
}

//FUNCIONES PARA CREAR REGISTRO
const nuevoPropietario = async (req, res) => {
    const { body } = req;
    //Crear Registro --> Retorna objeto
    try {
        //Validar si existe correo 
        const existeCorreo = await Propietario.findOne({
            where: {
                correo: body.correo
            }
        });

        if (existeCorreo) {
            return res.status(400).json({
                msg: 'Ya existe el correo \"' + body.correo + "\" por favor introduca otro"
            })
        }
        const propietario = await Propietario.create(req.body)
        res.json(propietario)
    } catch (error) {
        console.log('Error al agregar propietario');
        res.status(500).json({
            msg: 'Error al agregar propietario'
        })
    }
}

const actualizarPropietario = async (req, res) => {
    const { idPropietario } = req.params;
    const { body } = req;

    try {
        const propietario = await Propietario.findByPk(idPropietario);

        if (!propietario) {
            return res.status(400).json({
                msg: 'No existe el propietario con el id: ' + idPropietario
            });
        }

        await propietario.update(body);
        res.json(propietario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el propietario' });
    }
};

const eliminarPropietarioFisico = async (req, res) => {

    //Verificar si existe
    const { idPropietario } = req.params;

    const propietario = await Propietario.findByPk(idPropietario);

    if (!propietario) {
        return res.status(500).json({
            msg: `No existe el producto en el propietario con id: ${idPropietario}`
        })
    }

    await propietario.destroy();

    res.json(propietario);

}

module.exports = {
    inicio,
    cerrarSesion,
    loginPropietario,
    getPropietario,
    getPropietarioById,
    nuevoPropietario,
    actualizarPropietario,
    eliminarPropietarioFisico,
}