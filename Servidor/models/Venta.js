const { DataTypes } = require('sequelize')
const db = require('../config/db')
const Platillo = require('./Platillo')

const Venta = db.define('venta', {
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
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
}, {
    tableName: 'venta',
    timestamps: false
});

Venta.belongsTo(Platillo, {
    foreignKey: 'idPlatillo'
});

module.exports = Venta