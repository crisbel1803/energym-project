const mongoose = require('mongoose')

/*conectar a la bd 
mongoose.connect('ruta de conexion')*/

//definir el esquema para el modelo salones
const salonSchema = new mongoose.Schema({
    nombre:String,
    capacidad:Number,
    descripcion:String,
    equipamiento:String,
    ubicacion:String,
    status:String
})

//configurar la respuesta del salon en el esquema
salonSchema.set('toJSON',{
    transform:(document,returnObject) =>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id 
    }  
})

//seleccionar un nombre, registrar en modelo (tabla)
const salon = mongoose.model('salon',salonSchema)

//exportar
module.exports = salon