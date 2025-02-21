const Testimonial = require('../models/testimonialSchema');

class TestimonialController {
  static async create(req, res) {
    try {
      const { usuario_nombre, comentario, calificacion } = req.body;
      const newTestimonial = new Testimonial({ usuario_nombre, comentario, calificacion });
      await newTestimonial.save();
      res.status(201).json({ message: 'Testimonio creado exitosamente', testimonial: newTestimonial });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear testimonio', error });
    }
  }

  static async getAll(req, res) {
    try {
      const testimonials = await Testimonial.find();
      res.json({ testimonials });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener testimonios', error });
    }
  }
}

module.exports = TestimonialController;
