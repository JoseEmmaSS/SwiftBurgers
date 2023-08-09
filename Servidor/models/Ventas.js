const { DataTypes } = require('sequelize')
const db = require('../config/db')
const Platillo = require('../models/Platillo')

const Ventas = db.define('ventas', {
    idVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idPlatillo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'ventas',
})

Ventas.belongsTo(Platillo, {
    foreignKey: 'idPlatillo'
});

module.exports = Ventas