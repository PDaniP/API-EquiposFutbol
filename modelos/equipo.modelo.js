//El modelo busca informacion en la base de datos y las envia al controlador.
const fs = require('fs');
const path = require('path');
const rutaDatos = path.join(__dirname, "../data/equiposFutbol.json");
const leerDatos = fs.readFileSync(rutaDatos, "utf-8")

//variable para importar los datos del json
const datos = JSON.parse(leerDatos)

//Funcion para mostrar todos los datos
const mostrarTodosLosDatos = () => {
  return datos;
};

//mostrar equipos por id
const mostrarEquipoPorID = (id) => {
  return datos.find((equipo) => equipo.id === id);
}

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

//muestra equipos segun el año de fundacion (anterior o posterior)
const filtrarPorFundacion = (anio, tipo) => {
  const equiposFiltrados = datos.filter((equipo) => {
    if (tipo === 'anterior') {
      return equipo.fundacion < anio; 
    } else if (tipo === 'posterior') {
      return equipo.fundacion > anio; 
    }
    return false; 
  });

  return equiposFiltrados.map((equipo) => ({
    nombre: equipo.nombre,
    fundacion: equipo.fundacion,
  }));
};

//filtra equipos por uno o dos colores de camiseta
const filtrarPorColor = (color1, color2) => {
  const c1 = color1 ? color1.toLowerCase() : null;
  const c2 = color2 ? color2.toLowerCase() : null;

  const equiposFiltrados = datos.filter((equipo) => {
    if (!equipo.coloresCamiseta) {
      return false;
    }
    
    const { color1: teamC1, color2: teamC2 } = equipo.coloresCamiseta;

    if (c1 && !c2) {
      return teamC1 === c1 || teamC2 === c1;
    } 
    
    else if (c1 && c2) {
      return (teamC1 === c1 && teamC2 === c2) || (teamC1 === c2 && teamC2 === c1);
    }
    
    return false; 
  });

  return equiposFiltrados.map((equipo) => ({
    nombre: equipo.nombre,
    colores: equipo.coloresCamiseta,
  }));
};

//busca equipos cuyo nombre tenga el texto de busqueda (no sensible a may/min)
const buscarPorNombre = (nombre) => {
  const nombreBusqueda = nombre.toLowerCase();

  const equiposFiltrados = datos.filter((equipo) => {
    return equipo.nombre.toLowerCase().includes(nombreBusqueda);
  });
  
  return equiposFiltrados;
};

//filtra equipos por pais especifico (coincidencia exacta, no sensible a may/min)
const filtrarPorPais = (pais) => {
  const paisBusqueda = pais.toLowerCase();

  const equiposFiltrados = datos.filter((equipo) => {
    //ver de que el equipo tenga la propiedad 'pais'
    if (!equipo.pais) {
      return false;
    }
    return equipo.pais.toLowerCase() === paisBusqueda;
  });

  return equiposFiltrados;
};

//filtra equipos por una liga especifica (coincidencia exacta, no sensible a may/min)
const filtrarPorLiga = (liga) => {
  const ligaBusqueda = liga.toLowerCase();

  const equiposFiltrados = datos.filter((equipo) => {
    //ver de que el equipo tenga la propiedad 'liga'
    if (!equipo.liga) {
      return false;
    }
    //compara que la liga sea exacta
    return equipo.liga.toLowerCase().includes(ligaBusqueda);
  });

  return equiposFiltrados;
};

//filtra equipos por pais y que tengan titulos internacionales
const filtrarPorPaisConTitulosInt = (pais) => {
  const paisBusqueda = pais.toLowerCase();

  const equiposFiltrados = datos.filter((equipo) => {
    //asegurarse de que el equipo tenga las propiedades
    if (!equipo.pais || equipo.cantidadDeTitulosInternacionales === undefined) {
      return false;
    }
    
    //ambas condiciones deben cumplirse
    const coincidePais = equipo.pais.toLowerCase() === paisBusqueda;
    const tieneTitulos = equipo.cantidadDeTitulosInternacionales > 0;

    return coincidePais && tieneTitulos;
  });

  return equiposFiltrados.map((equipo) => ({
    nombre: equipo.nombre,
    pais: equipo.pais,
    cantidadDeTitulosInternacionales: equipo.cantidadDeTitulosInternacionales,
  }));
};

//Filtra equipos usando un objeto de queries (filtros)
const filtrarConQuery = (filtros) => {
  // Empezamos con todos los datos
  let equiposFiltrados = [...datos];

  // Aplicamos filtro de pais (si es que existe en la query), ej: ?pais=España
  if (filtros.pais) {
    equiposFiltrados = equiposFiltrados.filter((equipo) =>
      equipo.pais.toLowerCase() === filtros.pais.toLowerCase()
    );
  }

  // Aplicamos filtro de liga (busqueda parcial), ej: ?liga=Premier
  if (filtros.liga) {
    equiposFiltrados = equiposFiltrados.filter((equipo) =>
      equipo.liga.toLowerCase().includes(filtros.liga.toLowerCase())
    );
  }

  // Aplicamos filtro de titulos nacionales (mayor que), ej: ?titulosNacionales=50
  if (filtros.titulosNacionales) {
    const titulos = parseInt(filtros.titulosNacionales);
    equiposFiltrados = equiposFiltrados.filter((equipo) =>
      equipo.cantidadDeTitulosNacionales > titulos
    );
  }

  // Aplicamos filtro de titulos internacionales (mayor que), ej: ?titulosInternacionales=10
  if (filtros.titulosInternacionales) {
    const titulos = parseInt(filtros.titulosInternacionales);
    equiposFiltrados = equiposFiltrados.filter((equipo) =>
      equipo.cantidadDeTitulosInternacionales > titulos
    );
  }
  return equiposFiltrados;
};


/*******************************************************************/
/*******************************************************************/
/*******************************************************************/

// Agrega un nuevo equipo al JSON
const agregarEquipo = (nuevoEquipo) => {
  
  //tomamos el ultimo equipo del array 'datos' 
  const maxId = datos.reduce((max, equipo) => (equipo.id > max ? equipo.id : max), 0);
  const nuevoId = maxId + 1;

  
  //uso (...) para combinar el id con el resto de datos
  const equipoConId = { id: nuevoId, ...nuevoEquipo };

  datos.push(equipoConId);

  try {
    fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");
    return equipoConId;
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error);
    return null; 
  }
};


/*******************************************************************/
/*******************************************************************/
/*******************************************************************/


//Elimina un equipo por su ID
const eliminarEquipo = (id) => {
  const indice = datos.findIndex(equipo => equipo.id === id);

  if (indice === -1) {
    return null; 
  }

  const equipoEliminado = datos.splice(indice, 1)[0];

  try {
    fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");
    return equipoEliminado;
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error);
    return { error: "Error de escritura al eliminar." };
  }
};


/*******************************************************************/
/*******************************************************************/
/*******************************************************************/

// Actualiza (PATCH) solo los titulos nacionales de un equipo por ID
const actualizarTitulosNacionales = (id, nuevaCantidad) => {
  const equipoAActualizar = datos.find(equipo => equipo.id === id);

  if (!equipoAActualizar) {
    return null; 
  }

  equipoAActualizar.cantidadDeTitulosNacionales = nuevaCantidad;

  try {
    fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");
    return equipoAActualizar;
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error);
    return { error: "Error de escritura al actualizar." };
  }
};

// Actualiza (PATCH) solo los titulos internacionales de un equipo por ID
const actualizarTitulosInternacionales = (id, nuevaCantidad) => {
  
  const equipoAActualizar = datos.find(equipo => equipo.id === id);

  if (!equipoAActualizar) {
    return null; 
  }

  equipoAActualizar.cantidadDeTitulosInternacionales = nuevaCantidad;

  try {
    fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");
    
    return equipoAActualizar;
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error);
    return { error: "Error de escritura al actualizar." };
  }
};

// Actualiza (PATCH) solo la capacidad del estadio de un equipo por ID
const actualizarCapacidadEstadio = (id, nuevaCapacidad) => {
  
  const equipoAActualizar = datos.find(equipo => equipo.id === id);

  if (!equipoAActualizar) {
    return null;
  }

  equipoAActualizar.capacidadEstadio = nuevaCapacidad;

  try {
    fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");
    return equipoAActualizar;
  } catch (error) {
    console.error("Error al escribir en el archivo JSON:", error);
    return { error: "Error de escritura al actualizar." };
  }
};


//Para exportar
module.exports = {
  mostrarEquipoPorID,
  mostrarTodosLosDatos,
  titulosNacionales,
  titulosInternacionales,
  capEstadio,
  filtrarPorFundacion,
  filtrarPorColor,
  buscarPorNombre,
  filtrarPorPais,
  filtrarPorLiga,
  filtrarPorPaisConTitulosInt,
  filtrarConQuery,
  agregarEquipo,
  eliminarEquipo,
  actualizarTitulosNacionales,
  actualizarTitulosInternacionales,
  actualizarCapacidadEstadio
};
