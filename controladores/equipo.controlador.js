//Pido datos al modelo y los envio a vista
const importModelo = require("../modelos/equipo.modelo")
const importVista = require("../vistas/equipo.vista")


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
    mostrarCapacidadEstadio,   
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