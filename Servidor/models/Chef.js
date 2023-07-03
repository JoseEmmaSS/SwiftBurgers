const { DataTypes } = require('sequelize')
const db = require('../config/db')
const bcryp = require('bcrypt')

const Chef = db.define('chef', {
    idChef: {
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
        allowNull: true
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
    hooks: {
        beforeCreate: async function(chef){
            const salt = await bcryp.genSalt(10)
            chef.password = await bcryp.hash(chef.password, salt);
        }
    }
}
)


module.exports = Chef