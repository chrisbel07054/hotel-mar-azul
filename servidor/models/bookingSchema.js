const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fechaEntrada: String,
  fechaSalida: String,
  nombreHabitacion: String,
  status: String,
  monto_pagado: Number,
  huespedes: Number
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Booking', bookingSchema);
 