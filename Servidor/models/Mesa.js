const { DataTypes } = require('sequelize')
const db = require('../config/db')

const Mesa = db.define('mesa', {
    idMesa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    numeroMesa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'mesa',
    timestamps: false
});


module.exports = Mesa;