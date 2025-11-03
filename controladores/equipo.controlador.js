//Pido datos al modelo y los envio a vista
const importModelo = require("../modelos/equipo.modelo")
const importVista = require("../vistas/equipo.vista")


//Funcion para mostrar todos los datos.
function mostrarDatos(req, res) {
    const datos = importModelo.mostrarTodosLosDatos()
    res.status(200).json(datos)
}

//Funcion para mostrar los equipor por ID
function mostarPorID(req, res) {
    const datosID = parseInt(req.params.id)
    const datos = importModelo.mostrarEquipoPorID(datosID)
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

//Funcion unificada para filtrar por año de fundacion
function mostrarEquiposPorFundacion(req, res) {
  // Obtenemos ambos parámetros de la URL
  const anio = parseInt(req.params.anio);
  const tipo = req.params.tipo; // "anterior" o "posterior"

  // Validamos que el tipo sea uno de los esperados
  if (tipo !== 'anterior' && tipo !== 'posterior') {
    return res.status(400).json({ error: "Tipo de filtro inválido. Use 'anterior' o 'posterior'." });
  }

  // Validamos que el año sea un número
  if (isNaN(anio)) {
    return res.status(400).json({ error: "El año debe ser un número válido." });
  }

  const datos = importModelo.filtrarPorFundacion(anio, tipo);
  res.status(200).json(datos);
}

//Funcion para mostrar equipos por color(es)
function mostrarEquiposPorColor(req, res) {
  // Tomamos :color1 (obligatorio) y :color2 (opcional) de la URL
  const { color1, color2 } = req.params;

  // El modelo 'filtrarPorColor' ya maneja si 'color2' es undefined
  const datos = importModelo.filtrarPorColor(color1, color2);
  res.status(200).json(datos);
}

//Funcion para mostrar equipos por nombre
function mostrarEquiposPorNombre(req, res) {
  // Obtenemos el parámetro de la ruta (no necesita parseInt, es un string)
  const nombre = req.params.nombre;

  const datos = importModelo.buscarPorNombre(nombre);
  res.status(200).json(datos);
}

//Funcion para mostrar equipos por pais
function mostrarEquiposPorPais(req, res) {
  const pais = req.params.pais;
  const datos = importModelo.filtrarPorPais(pais);
  res.status(200).json(datos);
}

//Funcion para mostrar equipos por liga
function mostrarEquiposPorLiga(req, res) {
  const liga = req.params.liga;
  const datos = importModelo.filtrarPorLiga(liga);
  res.status(200).json(datos);
}

//Funcion para mostrar equipos por pais y que tengan titulos internacionales
function mostrarEquiposPorPaisConTitulosInt(req, res) {
  const pais = req.params.pais;
  const datos = importModelo.filtrarPorPaisConTitulosInt(pais);
  res.status(200).json(datos);
}

//Función para mostrar equipos usando filtros query
function mostrarEquiposConQuery(req, res) {
  const datos = importModelo.filtrarConQuery(req.query);
  res.status(200).json(datos);
}

/*******************************************************************/
/*******************************************************************/
/*******************************************************************/


//Función para crear un nuevo equipo
function crearEquipo(req, res) {
  // Los datos del nuevo equipo vienen en req.body
  const nuevoEquipoDatos = req.body;

  //me aseguro de que el body no este vacio
  if (!nuevoEquipoDatos || Object.keys(nuevoEquipoDatos).length === 0) {
    return res.status(400).json({ error: "No se proporcionaron datos para crear el equipo." });
  }

  const equipoCreado = importModelo.agregarEquipo(nuevoEquipoDatos);

  if (equipoCreado) {
    // Usamos el status 201 (Created)
    res.status(201).json(equipoCreado);
  } else {
    res.status(500).json({ error: "Error al guardar el equipo." });
  }
}

/*******************************************************************/
/*******************************************************************/
/*******************************************************************/

//Funcion para eliminar un equipo
function borrarEquipo(req, res) {
  // 1. Convertir el ID de la URL (string) a un numero
  const id = parseInt(req.params.id);

  // 2. Validar si el ID es un numero valido
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido. Debe ser un número." });
  }

  // 3. Llamar al modelo para eliminar
  const equipoEliminado = importModelo.eliminarEquipo(id);

  // 4. Manejar las respuestas
  if (equipoEliminado === null) {
    // Si el modelo devolvio null, es porque no lo encontro
    return res.status(404).json({ error: "Equipo no encontrado." });
  }

  if (equipoEliminado.error) {
    // Si el modelo devolvio un error (ej. al escribir el archivo)
    return res.status(500).json({ error: "Error del servidor al eliminar el equipo." });
  }

  // 5. Exito: Devolvemos el equipo que fue eliminado
  res.status(200).json({
    mensaje: "Equipo eliminado exitosamente",
    equipo: equipoEliminado
  });
}

/*******************************************************************/
/*******************************************************************/
/*******************************************************************/


//Funcion para actualizar (PATCH) titulos nacionales
function actualizarTitulosNac(req, res) {
  // 1. Obtener el ID de los parámetros de la ruta
  const id = parseInt(req.params.id);

  // 2. Obtener la nueva cantidad desde el body
  //    Esperamos un JSON como: { "titulos": 76 }
  const { titulos } = req.body;
  
  // 3. Validaciones
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  
  // Validamos que 'titulos' se haya enviado y sea un número
  if (titulos === undefined || isNaN(parseInt(titulos))) {
    return res.status(400).json({ error: "Datos de 'titulos' inválidos o no proporcionados en el body." });
  }

  // 4. Llamar al modelo
  const equipoActualizado = importModelo.actualizarTitulosNacionales(id, parseInt(titulos));

  // 5. Manejar la respuesta
  if (equipoActualizado === null) {
    return res.status(404).json({ error: "Equipo no encontrado." });
  }
  if (equipoActualizado.error) {
    return res.status(500).json({ error: "Error del servidor al actualizar." });
  }

  // 6. Exito
  res.status(200).json(equipoActualizado);
}

// Funcion para actualizar (PATCH) titulos internacionales
function actualizarTitulosInter(req, res) {
  // 1. Obtener el ID de los parametros de la ruta
  const id = parseInt(req.params.id);

  // 2. Obtener la nueva cantidad desde el body
  //    Esperamos un JSON como: { "titulos": 26 }
  const { titulos } = req.body;
  
  // 3. Validaciones
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  
  // Validamos que 'titulos' se haya enviado y sea un numero
  if (titulos === undefined || isNaN(parseInt(titulos))) {
    return res.status(400).json({ error: "Datos de 'titulos' inválidos o no proporcionados en el body." });
  }

  // 4. Llamar al modelo
  const equipoActualizado = importModelo.actualizarTitulosInternacionales(id, parseInt(titulos));

  // 5. Manejar la respuesta
  if (equipoActualizado === null) {
    return res.status(404).json({ error: "Equipo no encontrado." });
  }
  if (equipoActualizado.error) {
    return res.status(500).json({ error: "Error del servidor al actualizar." });
  }

  // 6. Exito
  res.status(200).json(equipoActualizado);
}

// Función para actualizar (PATCH) la capacidad del estadio
function actualizarCapacidad(req, res) {
  // 1. Obtener el ID de los params
  const id = parseInt(req.params.id);

  // 2. Obtener la nueva capacidad desde el body
  //    Esperamos un JSON como: { "capacidad": 55000 }
  const { capacidad } = req.body;
  
  // 3. Validaciones
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  
  if (capacidad === undefined || isNaN(parseInt(capacidad))) {
    return res.status(400).json({ error: "Datos de 'capacidad' inválidos o no proporcionados en el body." });
  }

  // 4. Llamar al modelo
  const equipoActualizado = importModelo.actualizarCapacidadEstadio(id, parseInt(capacidad));

  // 5. Manejar la respuesta
  if (equipoActualizado === null) {
    return res.status(404).json({ error: "Equipo no encontrado." });
  }
  if (equipoActualizado.error) {
    return res.status(500).json({ error: "Error del servidor al actualizar." });
  }

  // 6. Exito
  res.status(200).json(equipoActualizado);
}


//Export de funciones.
module.exports = {
    mostarPorID,
    mostrarDatos,
    mostrarTitulos,
    mostrarTitulosInter,
    mostrarCapacidadEstadio,
    mostrarEquiposPorFundacion,
    mostrarEquiposPorColor,
    mostrarEquiposPorNombre,
    mostrarEquiposPorPais,
    mostrarEquiposPorLiga,
    mostrarEquiposPorPaisConTitulosInt,
    mostrarEquiposConQuery,
    crearEquipo,
    borrarEquipo,
    actualizarTitulosNac,
    actualizarTitulosInter,
    actualizarCapacidad
}

/*
//modelo para la carga de equipos
const fs = require("fs");

class EquipoControlador {
  static crearEquipo(req, res) {
    const nuevoEquipo = req.body;

    // Validación simple
    if (!nuevoEquipo.nombre || !nuevoEquipo.pais || !nuevoEquipo.liga) {
      return res.status(400).json({
        error: "Faltan datos obligatorios del equipo"
      });
    }

    const equipoCreado = importModelo.EquipoModelo.agregarEquipo(nuevoEquipo);
    
    // Usamos la vista para estructurar la respuesta JSON
    //const respuesta = importVista.renderNuevoEquipoJSON(equipoCreado);

    res.status(201).json({
  mensaje: "Nuevo equipo agregado correctamente",
  equipo: equipoCreado
});



    res.status(201).json(respuesta);
  }
}

//para export
EquipoControlador*/


/*
//Funcion para eliminar equipos por nombre
function eliminarEquipo(req, res) {
  const nombre = req.params.nombre;
  const eliminado = importModelo.eliminarEquipo(nombre);

  if (eliminado) {
    res.status(200).json({ mensaje: `El equipo '${nombre}' fue eliminado correctamente.` });
  } else {
    res.status(404).json({ mensaje: `No se encontró el equipo '${nombre}'.` });
  }
}

//para importar
eliminarEquipo
*/


/*
//función agregar equipo
function agregarEquipo(req, res) {
  const nuevoEquipo = req.body;

  // Validar campos obligatorios
  const campos = [
    "nombre", "pais", "liga", "fundacion",
    "cantidadDeTitulosNacionales", "cantidadDeTitulosInternacionales",
    "capacidadEstadio", "coloresCamiseta"
  ];
  for (let campo of campos) {
    if (!nuevoEquipo[campo]) {
      return res.status(400).json({ mensaje: `Falta el campo '${campo}'` });
    }
  }

  // Llamar al modelo
  const resultado = importModelo.agregarEquipo(nuevoEquipo);

  if (!resultado.exito) {
    return res.status(400).json({ mensaje: resultado.mensaje });
  }

  res.status(201).json({
    mensaje: "Equipo agregado correctamente.",
    equipo: resultado.equipo
  });
}

//para exportar
agregarEquipo
*/


/*
//funciones para actualizar datos
//PUT - Actualizar títulos nacionales
function actualizarTitulosNacionales(req, res) {
  const nombre = req.params.nombre;
  const nuevosTitulos = parseInt(req.body.cantidadDeTitulosNacionales);

  if (isNaN(nuevosTitulos) || nuevosTitulos < 0) {
    return res.status(400).json({ mensaje: "El valor de títulos nacionales debe ser un número válido." });
  }

  const resultado = importModelo.actualizarTitulosNacionales(nombre, nuevosTitulos);

  if (!resultado.exito) return res.status(404).json({ mensaje: resultado.mensaje });
  res.status(200).json({
    mensaje: `Títulos nacionales de '${nombre}' actualizados correctamente.`,
    equipo: resultado.equipo
  });
}

//PUT - Actualizar títulos internacionales
function actualizarTitulosInternacionales(req, res) {
  const nombre = req.params.nombre;
  const nuevosTitulos = parseInt(req.body.cantidadDeTitulosInternacionales);

  if (isNaN(nuevosTitulos) || nuevosTitulos < 0) {
    return res.status(400).json({ mensaje: "El valor de títulos internacionales debe ser un número válido." });
  }

  const resultado = importModelo.actualizarTitulosInternacionales(nombre, nuevosTitulos);

  if (!resultado.exito) return res.status(404).json({ mensaje: resultado.mensaje });
  res.status(200).json({
    mensaje: `Títulos internacionales de '${nombre}' actualizados correctamente.`,
    equipo: resultado.equipo
  });
}

//PUT - Actualizar capacidad del estadio
function actualizarCapacidad(req, res) {
  const nombre = req.params.nombre;
  const nuevaCapacidad = parseInt(req.body.capacidadEstadio);

  if (isNaN(nuevaCapacidad) || nuevaCapacidad < 0) {
    return res.status(400).json({ mensaje: "La capacidad debe ser un número válido." });
  }

  const resultado = importModelo.actualizarCapacidad(nombre, nuevaCapacidad);

  if (!resultado.exito) return res.status(404).json({ mensaje: resultado.mensaje });
  res.status(200).json({
    mensaje: `Capacidad del estadio de '${nombre}' actualizada correctamente.`,
    equipo: resultado.equipo
  });
}

//para importar
actualizarTitulosNacionales,
  actualizarTitulosInternacionales,
  actualizarCapacidad
*/