const mongoose = require('mongoose')

/*conectar a la bd 
mongoose.connect('ruta de conexion')*/

//definir el esquema para el modelo instructores
const instructorSchema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    cedula:Number,
    telefono:Number,
    email:String,
    especialidades:String,
})

//configurar la respuesta del instructor en el esquema
instructorSchema.set('toJSON',{
    transform:(document,returnObject) =>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id 
    }  
})

//seleccionar un nombre, registrar en modelo (tabla)
const instructor = mongoose.model('instructor',instructorSchema)

//exportar
module.exports = instructor