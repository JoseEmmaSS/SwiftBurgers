const Inventario = require('../models/Inventario')

//MOSTRAR INVENTARIO
const getInventario = async (req, res) => {
    const inventario = await Inventario.findAll()
    res.json(inventario)
}


const getInventarioById = async (req, res) => {
    const { idInventario } = req.params;
    const inventario = await Inventario.findByPk(idInventario)

    if (inventario) {
        res.json(inventario)
    } else {
        res.status(404).json({
            msg: `Inventario no encontrado con id: ${idInventario}`
        })
    }
}

//CREAR INVENTARIO
const agregarInventario = async (req, res) => {
    const inventario = await Inventario.create(req.body)
    res.json(inventario)
}


//ACTUALIZAR
const actualizarInventario = async (req, res) => {
    const { idInventario } = req.params;
    const { body } = req;

    try {
        const inventario = await Inventario.findByPk(idInventario);

        if (!inventario) {
            return res.status(400).json({
                msg: 'No existe el producto de inventario con el id: ' + id
            });
        }

        await inventario.update(body);
        res.json(inventario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el inventario' });
    }
};


//ELIMINAR INVENTARIO
//--->ELIMINACIÓN FISICA <--
const eliminarInventarioFisico = async (req, res) => {

    //Verificar si existe
    const { idInventario } = req.params;

    const inventario = await Inventario.findByPk(idInventario);

    if (!inventario) {
        return res.status(500).json({
            msg: `No existe el producto en el inventario con id: ${idInventario}`
        })
    }

    await inventario.destroy();

    res.json(inventario)

}

//--->ELIMINACIÓN LOGICA <--
const eliminarInventarioLogico = async (req, res) => {
    const { idInventario } = req.params;

    const inventario = await Inventario.findByPk(idInventario);

    if (!inventario) {
        return res.status(500).json({
            msg: `No existe el producto en el inventario con id: ${idInventario}`
        })
    }

    await inventario.update({ disponible: false })

    res.json(inventario)
}


module.exports = {
    getInventario,
    getInventarioById,
    agregarInventario,
    actualizarInventario,
    eliminarInventarioFisico,
    eliminarInventarioLogico
}