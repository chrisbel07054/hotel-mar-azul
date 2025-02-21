const User = require('../models/userSchema');
const Booking = require('../models/bookingSchema');
const ContactMessage = require('../models/contactMessageSchema');
const Testimonial = require('../models/testimonialSchema');

class DashboardController {
    async getDashboardStats(req, res) {
        try {
          const [allUsers, allBookings, allTestimonials, allContactMessages] = await Promise.all([
            User.countDocuments(), 
            Booking.find().populate({
              path: 'usuarioId',
              select: '-password'
            }).sort({ _id: -1 }).lean(),
            Testimonial.countDocuments(),
            ContactMessage.find().lean()
          ]);
      
          // Calculr etadísticas
          const totalBookings = allBookings.length;
          const totalContactMessages = allContactMessages.length;
      
          const confirmedBookings = allBookings.filter(booking => booking.status === 'confirmado');
          const canceledBookings = allBookings.filter(booking => booking.status === 'cancelado');
          
          const totalRooms = 100; // hotel mar azul tiene 100 habitaciones (por ejemplo)
          const occupancyRate = Math.round((confirmedBookings.length / totalRooms) * 100);
      
          // datos para el dashboard
          const dashboardData = {
            totals: {
              registeredUsers: allUsers,
              totalBookings,
              testimonials: allTestimonials,
              contactMessages: totalContactMessages
            },
            bookingStats: {
              occupancyRate,
              confirmedBookingsTotal: confirmedBookings.length,
              canceledBookingsTotal: canceledBookings.length
            },
            fullData: {
              bookings: [...confirmedBookings, ...canceledBookings],
              contactMessages: allContactMessages
            }
          };
      
          res.status(200).json(dashboardData);
        } catch (error) {
          console.error('Dashboard stats error:', error);
          res.status(500).json({ error: 'Error fetching dashboard statistics' });
        }
    } 
}

module.exports = new DashboardController();