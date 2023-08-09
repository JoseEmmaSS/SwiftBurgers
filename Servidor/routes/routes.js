const express = require('express')
const propietarioController = require('../controller/propietarioController')
const inventarioController = require('../controller/inventarioController')
const chefController = require('../controller/chefController')
const mesaController = require('../controller/mesaController')
const clienteController = require('../controller/clienteController')
const platilloController = require('../controller/platilloController')

// Verificación de cuenta
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/inicio', propietarioController.inicio);

//Ruta Propietario
router.get('/propietario', propietarioController.getPropietario);
router.get('/propietario/:idPropietario', propietarioController.getPropietarioById)
router.post('/nuevoPropietario', propietarioController.nuevoPropietario);
router.post('/login', propietarioController.loginPropietario);
router.put('/propietario/:idPropietario', auth, propietarioController.actualizarPropietario);
router.delete('/propietario/:idPropietario', propietarioController.eliminarPropietarioFisico);

router.post('/inicio', auth, (req, res) => {
    res.status(200).send('Bienvenido')
})

//Ruta Chef

router.get('/chef', chefController.getChef);
router.post('/nuevoChef', chefController.nuevoChef);
router.get('/chef/:idChef', chefController.getChefById);
router.put('/chef/:idChef', auth, chefController.actualizarChef);
router.delete('/chef/:idChef', chefController.eliminarChefFisico);

//Ruta Inventario
router.get('/inventario', auth, inventarioController.getInventario);
router.get('/inventario/:idInventario', auth, inventarioController.getInventarioById);
router.post('/agregarInventario', auth, inventarioController.agregarInventario);
router.put('/inventario/:idInventario', auth, inventarioController.actualizarInventario);
router.put('/eliminarInventarioLogico/:idInventario', inventarioController.eliminarInventarioLogico);
router.delete('/Inventario/:idInventario', inventarioController.eliminarInventarioFisico);


//Ruta Cliente
router.get('/cliente', clienteController.getCliente);
router.get('/cliente/:idCliente', clienteController.getClienteById);
router.post('/agregarCliente', clienteController.agregarCliente);
router.put('/cliente/:idCliente', auth, clienteController.actualizarCliente);
router.delete('/cliente/:idCliente', clienteController.eliminarClienteFisico);
//Ruta Mesa
router.post('/agregarMesa', mesaController.agregarMesa);
router.put('disponibleMesa/:idMesa', mesaController.disponibleMesa)

//Ruta Platillo
router.get('/platillo', platilloController.getPlatillos)
router.get('/getImagenes', platilloController.getImagenes)
router.get('/platillo/:idPlatillo', auth, platilloController.getPlatilloById)
router.get('/platilloImg/:idPlatillo', platilloController.getImagen)
router.post('/agregarPlatillo', auth, platilloController.agregarPlatillo)
router.put('/platillo/:idPlatillo', auth, platilloController.actualizarPlatillo)
router.delete('/platillo/:idPlatillo', platilloController.eliminarPLatillo)


module.exports = router