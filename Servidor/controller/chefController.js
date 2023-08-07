const Chef = require('../models/Chef')

//GET
const getChef = async (req, res) => {
    const chef = await Chef.findAll()
    res.json(chef)
}

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
                msg: 'Ya existe el correo \"' + body.correo + "\" por favor introduca otro"
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


const actualizarChef = async (req, res) => {
    const { idChef } = req.params;
    const { body } = req;

    try {
        const chef = await Chef.findByPk(idChef);

        if (!chef) {
            return res.status(400).json({
                msg: 'No existe el propietario con el id: ' + idChef
            });
        }

        await chef.update(body);
        res.json(chef);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el propietario' });
    }
};

const eliminarChefFisico = async (req, res) => {

    //Verificar si existe
    const { idChef } = req.params;

    const chef = await Chef.findByPk(idChef);

    if (!chef) {
        return res.status(500).json({
            msg: `No existe el producto en el propietario con id: ${idChef}`
        })
    }

    await chef.destroy();

    res.json(chef);

}

module.exports = {
    getChef,
    nuevoChef,
    getChefById,
    actualizarChef,
    eliminarChefFisico,
}