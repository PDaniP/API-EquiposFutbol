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

//Funcion para mostrar titulos internacionales
function mostrarTitulosInter(req, res) {
    const titulo = req.params.internacionales
    const datos = importModelo.titulosInternacionales(titulo);
    res.status(200).json(datos)
}

//Funcion para mostrar capacidad del estadio.
function mostrarCapacidadEstadio(req, res) {
    const capacidad = req.params.capacidad
    const datos = importModelo.capEstadio(capacidad);
    res.status(200).json(datos)
}


//Export de funciones.
module.exports = {
    mostrarDatos,
    mostrarTitulos,
    mostrarTitulosInter,
    mostrarCapacidadEstadio
}
