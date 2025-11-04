# Programacion-examen
Trabajo final de la materia Programacion (Desarrollo de Software - 2do año)

Alumno: Picasso Pablo

1- Descripcion general

El tema elegido de esta API es una base de datos de equipos de futbol de diversas ligas del mundo (Argentina, España, Italia, Alemania, Inglaterra y Francia).

El motivo de esta eleccion es el gusto personal por el futbol, y que el tema ofrece una variedad de datos considerables (nombre, pais, liga, cantidad de titulos ya sean nacionales o internacionales, capacidad de los estadios, colores de camisetas) que fueron elegidos de entre muchos otros, y que permiten implementar una variedad de filtros y metodos de consulta (busqueda por ID, nombre, valores numericos, filtros combinados, etc.). Considere que el tema era bueno para practicar los fundamentos de una API.

Resumen de funcionamiento:

La API es un servidor construido con Node.js y Express.
Sigue una arquitectura MVC (Modelo-Vista-Controlador) para mantener el codigo organizado y escalable.

La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Borrar) sobre una coleccion de equipos de futbol. Los datos se guardan en un archivo JSON (equiposFutbol.json).
Incluye middlewares para el registro de peticiones y para la validacion de datos de entrada.


2- Estructura del proyecto.

El proyecto se organiza en las siguientes carpetas y archivos:

.
├── data/
│   └── equiposFutbol.json        # Archivo de base de datos
├── middlewares/
│   ├── equipo.logger.js          # Middleware de logging (Morgan)
│   └── equipo.validateData.js    # Middlewares de validacion (Express-Validator)
├── modelos/
│   └── equipo.modelo.js          # (Modelo) Logica de acceso a datos
├── controladores/
│   └── equipo.controlador.js     # (Controlador) Logica de aplicacion y cordinacion
├── vistas/
│   └── equipo.vista.js           # (Vista/Router) Definicion de rutas/endpoints
├── index.js                      # Archivo principal, servidor Express
├── package-lock.json
├── package.json
└── README.md


Explicacion de las capas:

* Modelo(equipo.modelo.js): Es la capa encargada de la interaccion con los datos. Lee el archivo "equiposFutbol.json" y da funciones al controlador para mostrar, buscar, filtrar, agregar, actualizar y eliminar equipos. No conoce las peticiones o las respuestas.

* Controlador(equipo.controlador.js): Recibe las peticiones desde el router, usa las funciones del Modelo para obtener o modificar los datos y envia una respuesta al cliente (en formato JSON) con el estado que corresponda (200, 201, 404, 400, etc.).

* Vista(equipo.vista.js): Actua como el Router de la API. Define todos los endpoints, especifica sus metodos HTTP (GET, POST, PUT/PATCH, DELETE) y los conecta con la funcion correspondiente en el Controlador. Tambien se encarga de aplicar los middlewares de validacion a rutas especificas. 

* Middlewares: Son funciones que se ejecutan en el medio de la peticion y la respuesta.


3- Endpoints documentados

La ruta base para todos los endpoints es: http://localhost:3000/equipos

Metodos GET (Lectura):

Método  Ruta                               Descripción                                                         Ejemplo de Uso
GET     /lista                             Obtiene la lista completa de equipos.                               /equipos/lista
GET     /idEquipo/:id                      Busca un equipo por su ID numerico.                                 /equipos/idEquipo/5
GET     /nombre/:nombre                    Busca equipos cuyo nombre contenga el texto (parcial).              /equipos/nombre/real
GET     /pais/:pais                        Filtra equipos por un pais (coincidencia exacta).                   /equipos/pais/Italia
GET     /liga/:liga                        Filtra equipos por liga (coincidencia parcial).                     /equipos/liga/Premier
GET     /nacionales/:nacionales            Filtra equipos con mas titulos nacionales que el N° dado.           /equipos/nacionales/50
GET     /internacionales/:internacionales  Filtra equipos con mas titulos internacionales que el N° dado.      /equipos/internacionales/10
GET     /capacidad/:capacidad              Filtra equipos con mas capacidad en el estadio que el N° dado.      /equipos/capacidad/50000
GET     /fundacion/:tipo/:anio             Filtra por año de fundacion. tipo debe ser "anterior" o "posterior" /equipos/fundacion/anterior/1910
GET     /colores/:color1                   Busca equipos que tengan color1.                                    /equipos/colores/rojo
GET     /colores/:color1/:color2           Busca equipos que tengan color1 Y color2.                           /equipos/colores/rojo/blanco
GET     /pais/:pais/internacionales        Filtra equipos de un pais que tengan > 0 titulos int.               /equipos/pais/España/internacionales
GET     /buscar                            Filtro dinámico usando Query Params.                                /equipos/buscar?pais=Italia&liga=Serie A

Ejemplo de busquedas query:
/buscar?pais=Argentina
/buscar?liga=premier
/buscar?titulosInternacionales=10
/buscar?pais=España&titulosNacionales=30
/buscar?pais=Inglaterra&liga=premier&titulosInternacionales=5


Metodos POST (Creacion):

Método  Ruta     Descripción                    
POST    /crear   Crea un nuevo equipo en la BD. 

Ejemplo de Body (JSON)
{
    "nombre": "Nuevo FC", 
    "pais": "Uruguay",
    "liga": "Primera",
    "fundacion": 2024,
    "cantidadDeTitulosNacionales": 20,
    "cantidadDeTitulosInternacionales": 10,
    "capacidadEstadio": 15000,
    "coloresCamiseta":{
        "color1": "negro", 
        "color2": "blanco"
        }
}


Metodos PATCH (Actualizacion parcial)

Método   Ruta                             Descripcion                                                          Ejemplo de Body (JSON)
PATCH    /titulos/nacionales/:id          Actualiza solo los titulos nacionales del equipo con ese ID.         {""titulos"": 76}
PATCH    /titulos/internacionales/:id     Actualiza solo los titulos internacionales del equipo con ese ID.    {""titulos"": 26}
PATCH    /capacidad/:id                   Actualiza solo la capacidad del estadio del equipo con ese ID.       {""capacidad"": 55500}


Metodos DELETE (Borrado)

Método   Ruta              Descripción                                   Ejemplo de Uso
DELETE   /eliminar/:id     Elimina el equipo correspondiente a ese ID.   /equipos/eliminar/129


4- Middlewares implementados

1. express.json() (Global)
    * Descripcion: Middleware incorporado en Express.
    * Momento de ejecucion: En cada peticion que llega al servidor.
    * Funcion: Parsea los body de las peticiones entrantes que tengan Content-Type: application/json. Permite que los datos enviados en un POST o PATCH esten disponibles en req.body dentro del controlador.

2. Logger (Morgan) (equipo.logger.js) (Global)
    * Descripcion: Middleware de logging que usa morgan.
    * Momento de ejecucion: En cada peticion que llega al servidor.
    * Funcion: Imprime en la consola un registro de la peticion, incluyendo el metodo HTTP, la URL, el codigo de estado de la respuesta y el tiempo de respuesta en milisegundos. Esencial para depuracion y monitoreo.
    * Ejemplo de log: GET  /equipos/lista  200  4.581ms

3. Validadores (equipo.validateData.js) (Especifico)
    * Descripcion: Tres conjuntos de reglas de validacion usando express-validator.
    * Momento de ejecucion: Se ejecuta solo en las rutas donde son importados y aplicados (las rutas POST y PATCH)
    * Funcion: verifican que los datos en req.body cumplan con las reglas definidas. Si la validacion falla, detiene la ejecucion y devuelve una respuesta 400 Bad Request con los errores. Si la validacion es exitosa, permite que la peticion continue hacia el controlador.



5- Validaciones

1. Creacion de equipo (POST)
Se validan los siguientes datos del body:
    * nombre: Debe existir, ser un string y tener al menos 3 caracteres.
    * pais: Debe existir, ser un string y tener al menos 3 caracteres.
    * liga: Debe existir, ser un string y tener al menos 3 caracteres.
    * fundacion: Debe existir y ser un numero entre 1800 y 2025.
    * cantidadDeTitulosNacionales: Debe existir y ser un numero entero >= 0.
    * cantidadDeTitulosInternacionales: Debe existir y ser un numero entero >= 0.
    * capacidadEstadio: Debe existir y ser un numero entero >= 10000.
    * coloresCamiseta.color1: Debe existir, ser un string y tener al menos 3 caracteres.
    * coloresCamiseta.color2: Debe existir, ser un string y tener al menos 3 caracteres.

2. Actualizacion de titulos (nacionales e internacionales) (PATCH)
    * titulos: Debe existir en el body y ser un numero entero >= 0.

3. Actualizacion de capacidad (PATCH)
    * capacidad: debe existir en el body y ser un numero entero >= 10000.


Ejemplo de error de validacion.
Si se intenta crear un equipo (POST /crear) enviando un JSON con un año de fundacion invalido, la API respondera con un error 400:

{
    "errores": [
        {
            "type": "field",
            "value": 1700,
            "msg": "El año de fundacion debe ser un numero entero valido entre 1800 y 2025. Ej: 1950",
            "path": "fundacion",
            "location": "body"
        }
    ]
}


6- Ejemplos de uso (Postman)

Ejemplos de como usar la API con Postman.

* Ejemplo 1: Busqueda GET con Query 

Busca equipos de Inglaterra que tengan mas de 5 titulos internacionales.

Peticion: GET http://localhost:3000/equipos/buscar?pais=Inglaterra&titulosInternacionales=5

Respuesta:
[
    {
        "id": 91,
        "nombre": "Liverpool",
        "pais": "Inglaterra",
        "liga": "Premier League",
        "fundacion": 1892,
        "cantidadDeTitulosNacionales": 53,
        "cantidadDeTitulosInternacionales": 14,
        "capacidadEstadio": 61276,
        "coloresCamiseta": {
            "color1": "rojo",
            "color2": "blanco"
        }
    },
    {
        "id": 94,
        "nombre": "Chelsea",
        "pais": "Inglaterra",
        "liga": "Premier League",
        "fundacion": 1905,
        "cantidadDeTitulosNacionales": 23,
        "cantidadDeTitulosInternacionales": 9,
        "capacidadEstadio": 40173,
        "coloresCamiseta": {
            "color1": "azul",
            "color2": "blanco"
        }
    },
    {
        "id": 96,
        "nombre": "Manchester United",
        "pais": "Inglaterra",
        "liga": "Premier League",
        "fundacion": 1878,
        "cantidadDeTitulosNacionales": 60,
        "cantidadDeTitulosInternacionales": 8,
        "capacidadEstadio": 74310,
        "coloresCamiseta": {
            "color1": "rojo",
            "color2": "blanco"
        }
    }
]

* Ejemplo 2: Creacion POST de un nuevo equipo:

Peticion: POST http://localhost:3000/equipos/crear

Body(Json):

{
    "nombre": "Club Atlético Palmaflor",
    "pais": "Bolivia",
    "liga": "División de Fútbol Profesional",
    "fundacion": 2008,
    "cantidadDeTitulosNacionales": 0,
    "cantidadDeTitulosInternacionales": 0,
    "capacidadEstadio": 15000,
    "coloresCamiseta": {
        "color1": "verde",
        "color2": "amarillo"
    }
}

Respuesta (201 created): Devuelve el objeto creado con su nuevo ID

{
    "id": 130,
    "nombre": "Club Atlético Palmaflor",
    "pais": "Bolivia",
    "liga": "División de Fútbol Profesional",
    "fundacion": 2008,
    "cantidadDeTitulosNacionales": 0,
    "cantidadDeTitulosInternacionales": 0,
    "capacidadEstadio": 15000,
    "coloresCamiseta": {
        "color1": "verde",
        "color2": "amarillo"
    }
}

* Ejemplo 3: Actualizacion PATCH de titulos

Actualiza los titulos nacionales del equipo con ID 1(Boca Juniors)

Peticion: PATCH  http://localhost:3000/equipos/titulos/nacionales/1

Body(JSON):

{
    "titulos": 76
}

Respuesta (200 OK): Devuelve el objeto completo actualizado.

{
    "id": 1,
    "nombre": "Boca Juniors",
    "pais": "Argentina",
    "liga": "Liga Profesional de Fútbol",
    "fundacion": 1905,
    "cantidadDeTitulosNacionales": 76,
    "cantidadDeTitulosInternacionales": 25,
    "capacidadEstadio": 54000,
    "coloresCamiseta": {
        "color1": "azul",
        "color2": "amarillo"
    }
}

* Ejemplo 4: Borrado de un equipo

Elimina el equipo creado con ID 130

Peticion: DELETE http://localhost:3000/equipos/eliminar/130

Respuesta(200 Ok):

{
    "mensaje": "Equipo eliminado exitosamente",
    "equipo": {
        "id": 130,
        "nombre": "Club Atlético Palmaflor",
        "pais": "Bolivia",
        "liga": "División de Fútbol Profesional",
        "fundacion": 2008,
        "cantidadDeTitulosNacionales": 0,
        "cantidadDeTitulosInternacionales": 0,
        "capacidadEstadio": 15000,
        "coloresCamiseta": {
            "color1": "verde",
            "color2": "amarillo"
        }
    }
}



7- Conclusion