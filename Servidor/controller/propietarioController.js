//Importar modelo
const Propietario = require('../models/Propietario')
// Importar libreria 'BYCRYPT'
const bcryp = require('bcrypt')
// Importar libreria 'jsonwebtoken'
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')

dotenv.config({path: '.env'})

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

        if (propietario && (await bcryp.compare(password, propietario.password))){
            // Crear token
            const token = jwt.sign(
                {idPropietario: propietario.idPropietario, correo},
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


const getPropietario = async (req, res) => {
    const propietario = await Propietario.findAll()
    res.json(propietario)
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

module.exports = {
    inicio,
    loginPropietario,
    getPropietario,
    nuevoPropietario,
}