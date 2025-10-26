//El modelo busca informacion en la base de datos y las envia al conrtrolador.

//variable para importar los datos del json
const datos = require("../data/equiposFutbol.json");

//console.log(datos[0].nombre)

//Funcion para mostrar todos los datos
const mostrarTodosLosDatos = () =>{
    return datos;
}



//Para exportar 
module.exports = {
    mostrarTodosLosDatos
}