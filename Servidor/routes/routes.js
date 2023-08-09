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
router.get('/propietario', auth, propietarioController.getPropietario);
router.get('/propietario/:idPropietario', platilloController.getPlatilloById)
router.post('/nuevoPropietario', propietarioController.nuevoPropietario);
router.post('/login', propietarioController.loginPropietario);
router.post('/cerrarSesion', propietarioController.cerrarSesion);

router.post('/inicio', auth, (req, res) => {
    res.status(200).send('Bienvenido')
})

//Ruta Chef
router.post('/nuevoChef', chefController.nuevoChef);
router.get('/chef/:idChef', chefController.getChefById);

//Ruta Inventario
router.get('/inventario', auth, inventarioController.getInventario);
router.get('/inventario/:idInventario', auth, inventarioController.getInventarioById);
router.post('/agregarInventario', auth, inventarioController.agregarInventario);
router.put('/inventario/:idInventario', auth, inventarioController.actualizarInventario);
router.put('/eliminarInventarioLogico/:idInventario', inventarioController.eliminarInventarioLogico);
router.delete('/Inventario/:idInventario', inventarioController.eliminarInventarioFisico);


//Ruta Cliente
router.post('/agregarCliente', clienteController.agregarCliente)

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