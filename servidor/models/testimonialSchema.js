const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  usuario_nombre: String,
  comentario: String,
  calificacion: Number
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Testimonial', testimonialSchema);