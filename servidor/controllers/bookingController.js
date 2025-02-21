const Booking = require('../models/bookingSchema');
const nodemailer = require('nodemailer');

class BookingController {
  static async create(req, res) {
    try {
      const { usuarioId, fechaEntrada, fechaSalida, nombreHabitacion, monto_pagado, huespedes, email } = req.body;
  
      const reservasExistentes = await Booking.find({
        usuarioId: usuarioId,
        status: 'confirmado', // Solo verificar reservas confirmadas
        $or: [
          { fechaEntrada: { $lte: fechaSalida }, fechaSalida: { $gte: fechaEntrada } }
        ]
      });
  
      // verificar reservas existentes.
      if (reservasExistentes.length > 0) {
        return res.status(400).json({ message: 'Ya tienes una reserva en ese rango de fechas.' });
      }
  
      // Crear nueva reserva si no hay solapamiento
      const newBooking = new Booking({
        usuarioId,
        fechaEntrada,
        fechaSalida,
        nombreHabitacion,
        status: 'confirmado',
        monto_pagado,
        huespedes
      });
      await newBooking.save();
  
      // Configuración para enviar correo de reserva recibida.
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmación de Reserva Hotel Mar Azul',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #FFFFFF; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #00a6f4;">Confirmación de Reserva</h2>
            <p style="color: #2b7fff;">Estimado cliente,</p>
            <p>Hotel Mar Azul le notifica que su reserva en <strong>${nombreHabitacion}</strong> ha sido confirmada.</p>
            <p><strong>Fecha de Entrada:</strong> ${fechaEntrada}<br>
            <strong>Fecha de Salida:</strong> ${fechaSalida}</p>
            <p>El monto cancelado fue de: <strong>$${monto_pagado}</strong></p>
            <p>¡Gracias por elegirnos!</p>
            <button style="background-color: #ff6900; color: #FFFFFF; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Visite nuestro sitio web</button>
            <p style="color: #999; font-size: 0.9em; margin-top: 20px;">Hotel Mar Azul<br>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({ message: 'Reserva creada exitosamente', booking: newBooking });
    } catch (error) {
      console.log('Error al crear la reserva:', error);
      res.status(500).json({ message: 'Error al crear la reserva', error });
    }
  }

  static async getByUser(req, res) {
    try {
      const { id } = req.params;
      const bookings = await Booking.find({ usuarioId: id }).sort({ _id: -1 });
      res.json({ bookings });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reservas del usuario', error });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updatedBooking = await Booking.findByIdAndUpdate({ _id: id }, req.body, { new: true });
      res.json({ message: 'Reserva actualizada exitosamente', booking: updatedBooking });
    } catch (error) {
      console.log('Error al actualizar la reserva:', error);
      res.status(500).json({ message: 'Error al actualizar la reserva', error });
    }
  }
  
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const updatedBooking = await Booking.findByIdAndUpdate(id, { status: 'cancelado' }, { new: true });
      res.json({ message: 'Reserva cancelada exitosamente', booking: updatedBooking });
    } catch (error) {
      res.status(500).json({ message: 'Error al cancelar la reserva', error });
    }
  }
}

module.exports = BookingController;
