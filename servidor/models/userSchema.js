const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  rol: String,
  city: String,
  phone: String,
  cedula: String
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('User', userSchema);