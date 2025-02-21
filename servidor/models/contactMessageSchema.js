const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  mensaje: String
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);