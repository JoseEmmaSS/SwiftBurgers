const Platillo = require('../models/Platillo')

//MOSTRAR PLATILLO
const getPlatillos = async (req, res) => {
    const platillo = await Platillo.findAll()
    res.json(platillo)
}


//CREAR PLATILLO
const agregarPlatillo = async (req, res) => {
    const platilloData = req.body;
    const platillo = await Platillo.create(platilloData);
    
    if (req.files && req.files.file) {
        const EDFile = req.files.file;
        const fileExtension = EDFile.name.split('.').pop();
        const newFileName = `${platillo.idPlatillo}_${platilloData.nombre}_${Date.now()}.${fileExtension}`;

        EDFile.mv(`./src/img/${newFileName}`, error => {
            if (error) return res.status(500).send({ msg: error });
            
            platillo.imagen = newFileName;
            platillo.save();

            return res.status(200).json({
                msg: 'Platillo agregado y imagen cargada',
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

    if(!platillo){
        return res.status(500).json({
            ms: `No existe el platillo con id: ${idPlatillo}`
        })
    }
    await platillo.destroy()
    res.json(platillo)
}

module.exports = {
    getPlatillos,
    agregarPlatillo,
    actualizarPlatillo,
    eliminarPLatillo
}