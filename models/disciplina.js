const mongoose = require('mongoose')

/*conectar a la bd 
mongoose.connect('ruta de conexion')*/

//definir el esquema para el modelo disciplinas
const disciplinaSchema = new mongoose.Schema({
    nombre:String,
    descripcion:String,
    duracion:Number,
    nivel:String,
    capacidad:Number,
    precio:Number,
    status:String
})

//configurar la respuesta del disciplina en el esquema
disciplinaSchema.set('toJSON',{
    transform:(document,returnObject) =>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id 
    }  
})

//seleccionar un nombre, registrar en modelo (tabla)
const disciplina = mongoose.model('disciplina',disciplinaSchema)

//exportar
module.exports = disciplina