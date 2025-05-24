const mongoose = require('mongoose')

/*conectar a la bd 
mongoose.connect('ruta de conexion')*/

//definir el esquema para el modelo usuarios
const crypto = require('crypto');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: String,
    password: String,
    rol: {
        type: String,
        default: "afiliado"
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: () => crypto.randomBytes(20).toString('hex')
    }
});

//configurar la respuesta del usuario en el esquema
usuarioSchema.set('toJSON',{
    transform:(document,returnObject) =>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id 
    }  
})

//seleccionar un nombre, registrar en modelo (tabla)
const usuario = mongoose.model('usuario',usuarioSchema)

//exportar
module.exports = usuario