const express = require('express');
const app = express();
const port = 3000;
const importRoutes = require('./vistas/vista.js');

app.use(express.json);

//Ruta principal
app.use('/equipos', importRoutes)

app.use('/', (req, res) => {
    res.json({
        mensaje: "se esta escuchando servidor"
    })
})

//inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});