//Importar modelo
const Propietario = require('../models/Propietario')

const inicio = (req, res) => {
    res.send('Rutas funcionando')
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
    getPropietario,
    nuevoPropietario,
}