const mongoose = require('mongoose')

const eventoSchema = new mongoose.Schema({
  title: { type: String, 
    required: true },      // Título del evento
  start: { type: Date, 
    required: true },       // Fecha y hora de inicio
  end: { type: Date },                         // Fecha y hora de finalización
  description: { type: String },               // Descripción del evento
  room: { type: String, required: true },      // Salón donde se realizará
  instructor: { type: String, required: true } // Nombre del instructor
});

const evento = mongoose.model('evento', eventoSchema);

module.exports = evento;