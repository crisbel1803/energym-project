const mongoose = require('mongoose')

const eventoSchema = new mongoose.Schema({
  title: { type: String, 
    required: true },
  start: { type: Date, 
    required: true },
  end: { type: Date },
  description: { type: String },
  room: { type: String, required: true },
  instructor: { type: String, required: true },
  capacidad:Number,
  precio:Number,   
});

const evento = mongoose.model('evento', eventoSchema);

module.exports = evento;