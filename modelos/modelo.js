//El modelo busca informacion en la base de datos y las envia al controlador.

//variable para importar los datos del json
const datos = require("../data/equiposFutbol.json");

//console.log(datos[0].nombre)

//Funcion para mostrar todos los datos
const mostrarTodosLosDatos = () => {
  return datos;
};

//console.log(datos[0].cantiadDeTitulosNacionales)

//muestra la los equipos con mas de x titulos nacionales
const titulosNacionales = (titulos) => {
  const titNaci = [];
  datos.filter((equipo) => {
    if (equipo.cantidadDeTitulosNacionales > titulos)
      titNaci.push({
        nombre: equipo.nombre,
        cantidad: equipo.cantidadDeTitulosNacionales,
      });
  });
  return titNaci;
};

//muestra la los equipos con mas de x titulos internacionales
const titulosInternacionales = (titulos) => {
  const titInter = [];
  datos.filter((equipo) => {
    if (equipo.cantidadDeTitulosInternacionales > titulos)
      titInter.push({
        nombre: equipo.nombre,
        cantidad: equipo.cantidadDeTitulosInternacionales,
      });
  });
  return titInter;
};

//filtra los equipos en base a la capacidad del estadio.
const capEstadio = (capacidad) => {
  const capEst = [];
  datos.filter((equipo) => {
    if (equipo.capacidadEstadio > capacidad)
      capEst.push({
        nombre: equipo.nombre,
        capacidad: equipo.capacidadEstadio,
      });
  });
  return capEst;
};



//Para exportar
module.exports = {
  mostrarTodosLosDatos,
  titulosNacionales,
  titulosInternacionales,
  capEstadio,
  
};

/*
//modelo para la carga de nuevos equipos
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/equiposFutbol.json");

class EquipoModelo {
  static obtenerTodos() {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  }

  static guardarEquipos(equipos) {
    fs.writeFileSync(dataPath, JSON.stringify(equipos, null, 2));
  }

  static agregarEquipo(nuevoEquipo) {
    const equipos = this.obtenerTodos();

    // Generar ID automáticamente
    nuevoEquipo.id = equipos.length > 0 ? equipos[equipos.length - 1].id + 1 : 1;

    // Reordenar el objeto para que "id" quede primero
    const equipoOrdenado = {
      id: nuevoEquipo.id,
      nombre: nuevoEquipo.nombre,
      pais: nuevoEquipo.pais,
      liga: nuevoEquipo.liga,
      fundacion: nuevoEquipo.fundacion,
      cantidadDeTitulosNacionales: nuevoEquipo.cantidadDeTitulosNacionales,
      cantidadDeTitulosInternacionales: nuevoEquipo.cantidadDeTitulosInternacionales,
      capacidadEstadio: nuevoEquipo.capacidadEstadio,
      coloresCamiseta: nuevoEquipo.coloresCamiseta,
    };

    equipos.push(equipoOrdenado);
    this.guardarEquipos(equipos);
    return equipoOrdenado;
  }
}

//para el export
EquipoModelo,*/

/*
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const rutaDatos = path.join(__dirname, "../data/equiposFutbol.json");

//función para eliminar un equipo por nombre
const eliminarEquipo = (nombre) => {
  // Filtra los equipos dejando fuera el que se quiere eliminar
  const nuevosDatos = datos.filter(
    (equipo) => equipo.nombre.toLowerCase() !== nombre.toLowerCase()
  );

  // Si la cantidad no cambió, significa que no existía ese nombre
  if (nuevosDatos.length === datos.length) {
    return false; // No se eliminó nada
  }

  // Actualiza la variable y el archivo
  datos = nuevosDatos;
  fs.writeFileSync(rutaDatos, JSON.stringify(nuevosDatos, null, 2), "utf-8");

  return true; // Eliminado correctamente
};

//para el export
eliminarEquipo
*/