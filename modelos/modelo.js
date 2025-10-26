//El modelo busca informacion en la base de datos y las envia al conrtrolador.

//variable para importar los datos del json
const datos = require("../data/equiposFutbol.json");

//console.log(datos[0].nombre)

//Funcion para mostrar todos los datos
const mostrarTodosLosDatos = () =>{
    return datos;
}

console.log(datos[0].cantiadDeTitulosNacionales)

//muestra la los equipos con mas de x titulos nacionales
const titulosNacionales = (titulos) =>{
    const titNaci = []
    datos.filter((equipo) => {
        if (equipo.cantiadDeTitulosNacionales > titulos)
            titNaci.push({nombre:equipo.nombre,
        cantidad:equipo.cantiadDeTitulosNacionales})
    })
    return titNaci;
}

//Para exportar 
module.exports = {
    mostrarTodosLosDatos,
    titulosNacionales
}