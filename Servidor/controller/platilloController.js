const Platillo = require('../models/Platillo')
const sharp = require('sharp');
const path = require('path');

//MOSTRAR PLATILLO
const getPlatillos = async (req, res) => {
    const platillo = await Platillo.findAll()
    res.json(platillo)
}

//MOSTAR IMAGENES
const fs = require('fs');

const getImagenes = async (req, res) => {
    const platillos = await Platillo.findAll();

    const directorioActual = __dirname;
    const directorioPadre = path.resolve(directorioActual, '..');

    const imagenesPromises = platillos.map(platillo => {
        const rutaImagen = path.join(directorioPadre, 'src', 'img', platillo.imagen);
        console.log(`Leyendo imagen: ${rutaImagen}`);

        return new Promise((resolve, reject) => {
            fs.readFile(rutaImagen, { encoding: 'base64' }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const base64Data = data.toString('base64');
                    const imageDataUrl = `data:image/jpeg;base64,${base64Data}`;
                    resolve(imageDataUrl);
                }
            });
        });
    });

    try {
        const imagenes = await Promise.all(imagenesPromises);
        res.send(imagenes);
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        res.status(500).send('Error al obtener las imágenes');
    }
};


//OBTENER IMAGEN ALMACENADA POR ID
const getImagen = async (req, res) => {
    const { idPlatillo } = req.params

    const platillo = await Platillo.findByPk(idPlatillo)
    const directorioActual = __dirname;
    const directorioPadre = path.resolve(directorioActual, '..');

    if (platillo) {
        res.sendFile(path.join(directorioPadre, 'src', 'img', platillo.imagen));

    } else {
        res.sendFile(path.join(directorioPadre, 'src', 'img', 'image-not-found.jpg'))
    }
}


//MOSTAR PLATILLO POR ID
const getPlatilloById = async (req, res) => {
    const { idPlatillo } = req.params
    const platillo = await Platillo.findByPk(idPlatillo)

    const directorioActual = __dirname;
    const directorioPadre = path.resolve(directorioActual, '..');

    if (platillo) {
        res.json(platillo)
        res.sendFile(path.join(directorioPadre, 'src', 'img', platillo.imagen));
    } else {
        res.status(400).json({
            msg: `Platillo no encontrado ${idPlatillo}`
        })
        res.sendFile(path.join(directorioPadre, 'src', 'img', 'image-not-found.jpg'))
    }
}

//CREAR PLATILLO
const agregarPlatillo = async (req, res) => {
    const platilloData = req.body;
    const platillo = await Platillo.create(platilloData);
    if (req.files && req.files.file) {
        const EDFile = req.files.file;
        const fileExtension = EDFile.name.split('.').pop();
        const newFileName = `${platillo.idPlatillo}_${platilloData.nombre}_${Date.now()}.${fileExtension}`;

        // Utiliza sharp para redimensionar la imagen antes de guardarla
        sharp(EDFile.data)
            .resize(800, 600)
            .toFile(`./src/img/${newFileName}`, (error, info) => {
                if (error) return res.status(500).send({ msg: error });

                platillo.imagen = newFileName;
                platillo.save();

                return res.status(200).json({
                    msg: 'Platillo agregado e imagen cargada',
                    platillo: platillo,
                });
            });
    } else {
        return res.status(200).json({
            msg: 'Platillo agregado (sin imagen)',
            platillo: platillo,
        });
    }
};

//ACTUALIZAR PLATILLO
const actualizarPlatillo = async (req, res) => {
    const { idPlatillo } = req.params
    const { body } = req

    try {
        const platillo = await Platillo.findByPk(idPlatillo)
        if (!idPlatillo) {
            return res.status(400).json({
                msg: `No existe el platillo con id: ${idPlatillo}`
            })
        }
        await platillo.update(body)
        res.json(platillo)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mgs: 'Error al actuaizar el platillo'
        })
    }
}

//ELIMINAR PLATILLO
const eliminarPLatillo = async (req, res) => {
    const { idPlatillo } = req.params
    const platillo = await Platillo.findByPk(idPlatillo)

    if (!platillo) {
        return res.status(500).json({
            ms: `No existe el platillo con id: ${idPlatillo}`
        })
    }
    await platillo.destroy()
    res.json(platillo)
}

module.exports = {
    getImagenes,
    getPlatillos,
    agregarPlatillo,
    getImagen,
    actualizarPlatillo,
    eliminarPLatillo,
    getPlatilloById
}