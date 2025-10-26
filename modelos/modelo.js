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
        if (equipo.cantidadDeTitulosNacionales > titulos)
            titNaci.push({nombre:equipo.nombre,
        cantidad:equipo.cantidadDeTitulosNacionales})
    })
    return titNaci;
}

//muestra la los equipos con mas de x titulos internacionales
const titulosInternacionales = (titulos) =>{
    const titInter = []
    datos.filter((equipo) => {
        if (equipo.cantidadDeTitulosInternacionales > titulos)
            titInter.push({nombre:equipo.nombre,
        cantidad:equipo.cantidadDeTitulosInternacionales})
    })
    return titInter;
}



//Para exportar 
module.exports = {
    mostrarTodosLosDatos,
    titulosNacionales,
    titulosInternacionales,
    capEstadio
}