const Cliente = require('../models/Cliente')


//GET
const getCliente = async (req, res) => {
    const cliente = await Cliente.findAll()
    res.json(cliente)
}

const getClienteById = async (req, res) => {
    const { idCliente } = req.params;
    const cliente = await Cliente.findByPk(idCliente)

    if(cliente){
        res.json(cliente)
    }else{
        res.status(404).json({
            msg: `Chef no encontrado con id: ${idCliente}`
        })
    }

}

//CREAR CLIENTE
const agregarCliente = async (req, res) => {
    const cliente = await Cliente.create(req.body)
    res.json(cliente)
}

const actualizarCliente = async (req, res) => {
    const { idCliente } = req.params;
    const { body } = req;

    try {
        const cliente = await Cliente.findByPk(idCliente);

        if (!cliente) {
            return res.status(400).json({
                msg: 'No existe el propietario con el id: ' + idCliente
            });
        }

        await cliente.update(body);
        res.json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el propietario' });
    }
};

const eliminarClienteFisico = async (req, res) => {

    //Verificar si existe
    const { idCliente } = req.params;

    const cliente = await Cliente.findByPk(idCliente);

    if (!cliente) {
        return res.status(500).json({
            msg: `No existe el producto en el propietario con id: ${idCliente}`
        })
    }

    await cliente.destroy();

    res.json(cliente);

}

module.exports = {
    getCliente,
    getClienteById,
    agregarCliente,
    actualizarCliente,
    eliminarClienteFisico,
}