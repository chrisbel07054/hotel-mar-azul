const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  nombreHabitacion: String,
  descripcion: String,
  comodidades: [String],
  fotos: [String],
  precio_noche: Number,
  maximo_huespedes: Number,
  extracto: String
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Habitacion', roomSchema);