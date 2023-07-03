const Cliente = require('../models/Cliente')

//CREAR CLIENTE
const agregarCliente = async (req, res) => {
    const cliente = await Cliente.create(req.body)
    res.json(cliente)
}


module.exports = {
    agregarCliente
}