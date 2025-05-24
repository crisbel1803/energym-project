const mongoose = require('mongoose')

/*conectar a la bd
mongoose.connect('ruta de conexion')*/

const disciplinaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    duracion: Number,
    nivel: String,
    status: String,
    imagen: { 
        type: String,
        default: '' 
    }
});

disciplinaSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v; //
    }
});

const disciplina = mongoose.model('disciplina', disciplinaSchema);

module.exports = disciplina;
