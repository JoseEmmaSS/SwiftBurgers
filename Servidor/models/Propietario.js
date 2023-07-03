const { DataTypes } = require('sequelize')
const bcryp = require('bcrypt')
const db = require('../config/db')

const Propietario = db.define('propietario', {
    idPropietario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    apellidoPaterno: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    apellidoMaterno: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    numeroTelefono: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nombreUsuario: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    //Interceptar password para hash
     hooks: {
        beforeCreate: async function(propietario){
            const salt = await bcryp.genSalt(10)
            propietario.password = await bcryp.hash(propietario.password, salt);
        }
     }
})

module.exports = Propietario