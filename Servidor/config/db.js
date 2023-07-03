const sequelize = require('sequelize');
const dotenv = require('dotenv')

dotenv.config({path: '.env'})

const db = new sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    
    // Configura cómo será el comportamiento para conexiones nuevas o existentes
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});




module.exports = db;
