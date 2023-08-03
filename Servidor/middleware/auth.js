const jwt = require('jsonwebtoken')
const db = require('../config/db')

const dotenv = require('dotenv')
dotenv.config({path: '.env'})

const veryfyToken = (req, res, next) => {
    const token = 
    req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        return res.status(403).send('Acceso denegado')
    }
    try {
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        req.propietario = decode
    } catch (error) {
        return res.status(401).send('Token invalido')
    }
    return next();
}

module.exports = veryfyToken