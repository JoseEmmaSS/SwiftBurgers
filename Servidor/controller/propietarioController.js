//Importar modelo
const Propietario = require('../models/Propietario')

const inicio = (req, res) => {
    res.send('Rutas funcionando')
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
                msg: 'Ya existe el correo ' + body.correo
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
    nuevoPropietario,
}