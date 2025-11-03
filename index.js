const express = require('express');
const app = express();
const port = 3000;
const importRoutes = require('./vistas/equipo.vista.js');

app.use(express.json());

//Ruta principal
app.use('/equipos', importRoutes)

//inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


//Modelo para la parte del Post.
//const { router } = require('./vistas/vista.js');
//app.use('/equipos', router);
