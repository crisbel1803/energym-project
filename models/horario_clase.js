const mongoose = require('mongoose')

/*conectar a la bd 
mongoose.connect('ruta de conexion')*/

//definir el esquema para el modelo horario_clases
const horario_claseSchema = new mongoose.Schema({
    id_clase:String, //del model clases
    id_salon:String, //del model salones
    id_instructor:String, //del model instructores
    dia_semana:String,
    hora_inicio:String,
    hora_fin:String,
    fecha_inicio:String,
    fecha_fin:String
})

//configurar la respuesta del horario_clase en el esquema
horario_claseSchema.set('toJSON',{
    transform:(document,returnObject) =>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id 
    }  
})

//seleccionar un nombre, registrar en modelo (tabla)
const horario_clase = mongoose.model('horario_clase',horario_claseSchema)

//exportar
module.exports = horario_clase