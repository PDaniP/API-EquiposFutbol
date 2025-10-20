const express = require('express');
const app = express();
const port = 3000;

//inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});