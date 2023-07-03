const express = require('express')
const router = require('./routes/routes')
const db = require('./config/db')

const app = express();

//Habilitar lectura de datos
app.use(express.json());

//Conexión a base de datos
async function connectToDatabase() {
    try {
        await db.authenticate();
        db.sync() // --> Crear tabla si no existe
        console.log('Conexión correcta');
        
    } catch (error) {
        console.log(error);
    }
}

connectToDatabase();


const port = 3000;

//Rutas -> Busca rutas con una diagonal
app.use('/', router)

app.listen(port, () => {
    console.log(`Puerto funcionando en http://localhost:${port}`)
})