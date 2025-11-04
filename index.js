const express = require('express');
const app = express();
const port = 3000;

const importRoutes = require('./vistas/equipo.vista.js');

const importMorgan = require('./middlewares/equipo.logger.js')
const importValidateData = require('./middlewares/equipo.validateData.js')

app.use(express.json());
app.use(importMorgan);
//app.use(importValidateData);


//Ruta principal
app.use('/equipos', importRoutes)

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