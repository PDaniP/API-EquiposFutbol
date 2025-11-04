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

app.post('/equipos/crear', importValidateData, (req, res) => {
  res.send('Equipo creado correctamente');
});

//inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


/*Nota:
se tuvo que instalar
npm install morgan
npm install express-validator */