const nodemailer = require("nodemailer");

class NotificationController {
  static async subscriptionNotification(req, res) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptionsSubscription = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Suscripción Activa a Nuestro Newsletter | Hotel Mar Azul",
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #FFFFFF; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #00a6f4;">¡Bienvenido a Nuestro Newsletter!</h2>
            <p style="color: #2b7fff;">Estimado cliente,</p>
            <p>Gracias por suscribirse a nuestro newsletter. A partir de ahora, recibirá las últimas noticias, ofertas exclusivas y actualizaciones de Hotel Mar Azul directamente en su bandeja de entrada.</p>
            <p style="color: #2b7fff;">¡Nos alegra tenerlo con nosotros!</p>
            <p style="color: #999; font-size: 0.9em;">Hotel Mar Azul<br></p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptionsSubscription);
      res.status(201).json({ message: "Correo de suscripción enviado con éxito" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al enviar el correo", error });
    }
  }
}

module.exports = NotificationController;
