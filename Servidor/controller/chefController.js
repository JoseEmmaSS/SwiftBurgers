const Chef = require('../models/Chef')

//GET
const getChefById = async (req, res) => {
    const { idChef } = req.params;
    const chef = await Chef.findByPk(idChef)

    if(chef){
        res.json(chef)
    }else{
        res.status(404).json({
            msg: `Chef no encontrado con id: ${idChef}`
        })
    }

}


//CREAR CHEF
const nuevoChef = async (req, res) => {
    const { body } = req;

    //Crear el Registro
    try {
        const existeCorreo = await Chef.findOne({
            where: {
                correo: body.correo
            }
        });

        if (existeCorreo) {
            return res.status(400).json({
                msg: 'Ya existe el correo' + body.correo
            })
        }
        //Crear Chef
        const chef = await Chef.create(req.body)
        res.json(chef)

    } catch (error) {
        console.log('Error al agregar chef')
        res.status(500).json({
            msg: 'Error al agregar el chef'
        })

    }
}

module.exports = {
    nuevoChef,
    getChefById
}