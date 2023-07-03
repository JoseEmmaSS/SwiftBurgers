const { DataTypes } = require('sequelize');
const db = require('../config/db')

const Platillo = db.define('platillo', {
    idPlatillo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'platillo',
    timestamps: false
})

module.exports = Platillo