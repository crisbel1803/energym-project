const mongoose = require('mongoose')

const reservaSchema = new mongoose.Schema({
    id_user: String,
    id_evento: String, 
    nombre_user: String,
    titulo_evento: String, 
    fecha_evento: String, 
    hora_evento: String, 
    pago: { type:String, default:"sin pagar" },
    fecha_reserva: String,
    estado_reserva: { type: String, default: "pendiente" },
    metodo_pago: String, 
    fecha_pago: { type: Date, default: Date.now },
    monto: Number,
    confirmacion_admin: { type: Boolean, default: false },
    comentarios: { type: String, default: "sin comentarios" }
});

const reserva = mongoose.model('reserva', reservaSchema);

module.exports = reserva;