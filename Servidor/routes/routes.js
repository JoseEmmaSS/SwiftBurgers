const express = require('express')
const propietarioController = require('../controller/propietarioController')
const inventarioController = require('../controller/inventarioController')
const chefController = require('../controller/chefController')
const mesaController = require('../controller/mesaController')
const clienteController = require('../controller/clienteController')
const platilloController = require('../controller/platilloController')
const router = express.Router()

router.get('/inicio', propietarioController.inicio);

//Ruta Propietario
router.post('/nuevoPropietario', propietarioController.nuevoPropietario);

//Ruta Chef
router.post('/nuevoChef', chefController.nuevoChef);
router.get('/chef/:idChef', chefController.getChefById);

//Ruta Inventario
router.get('/inventario', inventarioController.getInventario);
router.get('/inventario/:idInventario', inventarioController.getInventarioById);
router.post('/agregarInventario', inventarioController.agregarInventario);
router.put('/inventario/:idInventario', inventarioController.actualizarInventario );
router.put('/eliminarInventarioLogico/:idInventario', inventarioController.eliminarInventarioLogico);
router.delete('/Inventario/:idInventario', inventarioController.eliminarInventarioFisico);


//Ruta Cliente
router.post('/agregarCliente', clienteController.agregarCliente)

//Ruta Mesa
router.post('/agregarMesa', mesaController.agregarMesa);
router.post('disponibleMesa/:idMesa', mesaController.disponibleMesa)

//Ruta Platillo
router.get('/platillos', platilloController.getPlatillos)
router.post('/agregarPlatillo', platilloController.agregarPlatillo)
router.delete('/eliminarPlatillo/:idPlatillo', platilloController.eliminarPLatillo)

module.exports = router