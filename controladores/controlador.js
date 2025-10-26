//Pido datos al modelo y los envio a vista

const importModelo = require("../modelos/modelo")

//Funcion para mostrar todos los datos.
function mostrarDatos(req, res) {
    const datos = importModelo.mostrarTodosLosDatos()
    res.status(200).json(datos)
}

//Funcion para mostrar titulos nacionales.
function mostrarTitulos(req, res) {
    const titulo = req.params.nacionales
    const datos = importModelo.titulosNacionales(titulo);
    res.status(200).json(datos)
}

module.exports = {
    mostrarDatos,
    mostrarTitulos
}
