//El modelo busca informacion en la base de datos y las envia al controlador.
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const rutaDatos = path.join(__dirname, "../data/equiposFutbol.json");
const leerDatos = fs.readFileSync(rutaDatos, "utf-8")
//variable para importar los datos del json
const datos = JSON.parse(leerDatos)
//console.log(datos[0].nombre)

//Funcion para mostrar todos los datos
const mostrarTodosLosDatos = () => {
  return datos;
};

//console.log(datos[0].cantiadDeTitulosNacionales)

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

//muestra equipos según el año de fundación (anterior o posterior)
const filtrarPorFundacion = (anio, tipo) => {
  // Usamos filter() para filtrar el array principal
  const equiposFiltrados = datos.filter((equipo) => {
    if (tipo === 'anterior') {
      return equipo.fundacion < anio; // Compara si es menor
    } else if (tipo === 'posterior') {
      return equipo.fundacion > anio; // Compara si es mayor
    }
    return false; // No devuelve nada si el 'tipo' no coincide
  });

  // Usamos map() para formatear la salida solo con los datos que queremos
  return equiposFiltrados.map((equipo) => ({
    nombre: equipo.nombre,
    fundacion: equipo.fundacion,
  }));
};

//filtra equipos por uno o dos colores de camiseta
const filtrarPorColor = (color1, color2) => {
  // Normalizar colores a minúscula (si existen)
  const c1 = color1 ? color1.toLowerCase() : null;
  const c2 = color2 ? color2.toLowerCase() : null;

  const equiposFiltrados = datos.filter((equipo) => {
    // Asegurarse de que el equipo tenga la estructura de colores
    if (!equipo.coloresCamiseta) {
      return false;
    }
    
    const { color1: teamC1, color2: teamC2 } = equipo.coloresCamiseta;

    // Escenario 1: Se provee solo 1 color (c1 existe, c2 NO existe)
    if (c1 && !c2) {
      // Comprueba si el color 1 está en CUALQUIERA de las dos posiciones
      return teamC1 === c1 || teamC2 === c1;
    } 
    
    // Escenario 2: Se proveen 2 colores (ambos existen)
    else if (c1 && c2) {
      // Comprueba que AMBOS colores estén (sin importar el orden)
      return (teamC1 === c1 && teamC2 === c2) || (teamC1 === c2 && teamC2 === c1);
    }
    
    return false; // No se proveyó color1 o caso no manejado
  });

  // Devolvemos el nombre y los colores del equipo
  return equiposFiltrados.map((equipo) => ({
    nombre: equipo.nombre,
    colores: equipo.coloresCamiseta,
  }));
};

//busca equipos cuyo nombre contenga el texto de búsqueda (no sensible a may/min)
const buscarPorNombre = (nombre) => {
  // Convertimos el término de búsqueda a minúsculas
  const nombreBusqueda = nombre.toLowerCase();

  // Filtramos el array de datos
  const equiposFiltrados = datos.filter((equipo) => {
    // Convertimos el nombre del equipo a minúsculas y verificamos si incluye el término
    return equipo.nombre.toLowerCase().includes(nombreBusqueda);
  });
  
  // Devolvemos los equipos completos que coincidieron
  return equiposFiltrados;
};

// Filtra equipos por un país específico (coincidencia exacta, no sensible a may/min)
const filtrarPorPais = (pais) => {
  const paisBusqueda = pais.toLowerCase();

  const equiposFiltrados = datos.filter((equipo) => {
    // Asegurarse de que el equipo tenga la propiedad 'pais'
    if (!equipo.pais) {
      return false;
    }
    // Compara que el país sea exacto
    return equipo.pais.toLowerCase() === paisBusqueda;
  });

  return equiposFiltrados;
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
  filtrarPorPais
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
//para eliminar equipos
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



/*
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const rutaDatos = path.join(__dirname, "../data/equiposFutbol.json");

//función agregar equipo
const agregarEquipo = (nuevoEquipo) => {
  // Evitar duplicados por nombre
  const existe = datos.some(
    (equipo) => equipo.nombre.toLowerCase() === nuevoEquipo.nombre.toLowerCase()
  );
  if (existe) return { exito: false, mensaje: "Ya existe un equipo con ese nombre." };

  // Generar id automático (máximo actual + 1)
  const nuevoId = datos.length > 0 ? Math.max(...datos.map(e => e.id)) + 1 : 1;

  // Crear el objeto con id primero
  const equipoConIdPrimero = {
    id: nuevoId,
    nombre: nuevoEquipo.nombre,
    pais: nuevoEquipo.pais,
    liga: nuevoEquipo.liga,
    fundacion: nuevoEquipo.fundacion,
    cantidadDeTitulosNacionales: nuevoEquipo.cantidadDeTitulosNacionales,
    cantidadDeTitulosInternacionales: nuevoEquipo.cantidadDeTitulosInternacionales,
    capacidadEstadio: nuevoEquipo.capacidadEstadio,
    coloresCamiseta: {
      color1: nuevoEquipo.coloresCamiseta.color1,
      color2: nuevoEquipo.coloresCamiseta.color2,
      color3: nuevoEquipo.coloresCamiseta.color3
    }
  };

  // Agregar al array
  datos.push(equipoConIdPrimero);

  // Guardar en el archivo
  fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");

  return { exito: true, equipo: equipoConIdPrimero };
};

//para exportar
agregarEquipo
*/


/*
Funcion para actualizar

const fs = require('fs');
const path = require('path');
const rutaDatos = path.join(__dirname, "../data/equiposFutbol.json");

//Función auxiliar para guardar cambios
function guardarDatos() {
  fs.writeFileSync(rutaDatos, JSON.stringify(datos, null, 2), "utf-8");
}

//Actualizar títulos nacionales
const actualizarTitulosNacionales = (nombre, nuevosTitulos) => {
  const equipo = datos.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
  if (!equipo) return { exito: false, mensaje: "Equipo no encontrado." };

  equipo.cantidadDeTitulosNacionales = nuevosTitulos;
  guardarDatos();
  return { exito: true, equipo };
};

//Actualizar títulos internacionales
const actualizarTitulosInternacionales = (nombre, nuevosTitulos) => {
  const equipo = datos.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
  if (!equipo) return { exito: false, mensaje: "Equipo no encontrado." };

  equipo.cantidadDeTitulosInternacionales = nuevosTitulos;
  guardarDatos();
  return { exito: true, equipo };
};

//Actualizar capacidad del estadio
const actualizarCapacidad = (nombre, nuevaCapacidad) => {
  const equipo = datos.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
  if (!equipo) return { exito: false, mensaje: "Equipo no encontrado." };

  equipo.capacidadEstadio = nuevaCapacidad;
  guardarDatos();
  return { exito: true, equipo };
};

//para el import
actualizarTitulosNacionales,
actualizarTitulosInternacionales,
actualizarCapacidad
*/