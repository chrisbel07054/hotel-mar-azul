const Habitacion = require('../models/roomSchema');

class RoomController {
  static async create(req, res) {
    try {
      const { nombreHabitacion, descripcion, comodidades, fotos, precio_noche, maximo_huespedes } = req.body;
      const newRoom = new Habitacion({ nombreHabitacion, descripcion, comodidades, fotos, precio_noche, maximo_huespedes });
      await newRoom.save();
      res.status(201).json({ message: 'Habitación creada exitosamente', room: newRoom });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la habitación', error });
    }
  }

  static async getAll(req, res) {
    try {
      const rooms = await Habitacion.find();
      res.json({ rooms });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
  }
}


module.exports = RoomController;
