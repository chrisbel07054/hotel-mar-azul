const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  titulo: String,
  contenido: String,
  extracto: String,
  imagen: String,
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Blog', blogSchema);