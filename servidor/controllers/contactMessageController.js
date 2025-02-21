const ContactMessage = require("../models/contactMessageSchema");
const nodemailer = require("nodemailer");


class ContactMessageController {
  static async create(req, res) {
    try {
      const { nombre, correo, mensaje } = req.body;
      const newMessage = new ContactMessage({ nombre, correo, mensaje });
      await newMessage.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptionsContact = {
        from: process.env.EMAIL_USER,
        to: correo,
        subject: "Hemos recibido tu consulta | Hotel Mar Azul",
        html: `
                <div style="font-family: Arial, sans-serif; background-color: #FFFFFF; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #00a6f4;">¡Hemos recibido tu mensaje!</h2>
                  <p style="color: #2b7fff;">Estimado cliente,</p>
                  <p>Gracias por contactarnos. Hemos recibido tu consulta y nuestro equipo se pondrá en contacto contigo lo antes posible.</p>
                  <p style="color: #2b7fff;">Apreciamos tu interés en Hotel Mar Azul.</p>
                  <p style="color: #999; font-size: 0.9em;">Hotel Mar Azul<br></p>
                </div>
        `
      };

      await transporter.sendMail(mailOptionsContact);
      res.status(201).json({ message: "Mensaje de contacto enviado exitosamente", contactMessage: newMessage});
    } catch (error) {
      res.status(500).json({ message: "Error al enviar mensaje de contacto", error });
    }
  }

  static async getAll(req, res) {
    try {
      const messages = await ContactMessage.find();
      res.json({ messages });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener mensajes de contacto", error });
    }
  }
}

module.exports = ContactMessageController;
