const Blog = require('../models/blogSchema');

class BlogController {
  static async create(req, res) {
    try {
      const { titulo, contenido, imagen, extracto } = req.body;
      const newBlog = new Blog({ titulo, contenido, imagen, extracto });
      await newBlog.save();
      res.status(201).json({ message: 'Blog creado exitosamente', blog: newBlog });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el blog', error });
    }
  }

  static async getAll(req, res) {
    try {
      const blogs = await Blog.find();
      res.json({ blogs });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los blogs', error });
    }
  }
}

module.exports = BlogController;
