//Pido datos al modelo y los envio a vista

const importModelo = require("../modelos/modelo")

//Funcion para mostrar todos los datos.
function mostrarDatos(req, res) {
    const datos = importModelo.mostrarTodosLosDatos()
    res.status(200).json(datos)
}



module.exports = {
    mostrarDatos
}
