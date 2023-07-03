const { DataTypes } = require('sequelize')
const Mesa = require('../models/Mesa')
const db = require('../config/db')

const Cliente = db.define('cliente', {
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    mesa_idMesa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cliente',
    timestamps: false
});

Cliente.belongsTo(Mesa, {
    foreignKey: 'idMesa'
});


module.exports = Cliente