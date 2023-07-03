const Mesa = require('../models/Mesa')

const agregarMesa = async (req, res) => {
    const mesa = await Mesa.create(req.body)
    res.json(mesa);
}

//Mesa disponible
const disponibleMesa = async (req, res) => {
    const { idMesa } = req.params;

    const mesa = await Mesa.findByPk(idMesa);

    if (!mesa) {
        return res.status(500).json({
            msg: `No existe la mesa con el id: ${idMesa}`
        })
    }

    await mesa.update({ disponible: false })

}

module.exports = {
    agregarMesa,
    disponibleMesa
}