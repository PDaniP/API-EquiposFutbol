const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());


const importMorgan = require('./middlewares/equipo.logger.js')
app.use(importMorgan);

const importRoutes = require('./vistas/equipo.vista.js');
//Ruta principal
app.use('/equipos', importRoutes)

const importValidateData = require('./middlewares/equipo.validateData.js')

//app.use(importValidateData);




//Error al no encontrar una ruta
app.use('/',(req,res)=>{
  res.status(404).json({
    mensaje:'ruta no encontrada'
  })
})
//inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


/*Nota:
se tuvo que instalar
npm install morgan
npm install express-validator */