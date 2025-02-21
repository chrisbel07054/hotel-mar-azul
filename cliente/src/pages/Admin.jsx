import { useState, useEffect } from "react"
import { api } from "../service/apiService"
import { useAuth } from "../contexts/AuthProvider"
import { motion } from "framer-motion"
import { Users, CalendarDays, MessageSquare, Mail, TrendingUp, Hotel, CheckCircle, XCircle } from 'lucide-react'
import BookingsModal from "../components/BookingsModal"
import ContactMessagesModal from "../components/ContactMessagesModal"
import toast from "react-hot-toast"

export default function Admin() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showBookings, setShowBookings] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [stats, setStats] = useState({
    totals: {
      registeredUsers: 0,
      totalBookings: 0,
      testimonials: 0,
      contactMessages: 0
    },
    bookingStats: {
      occupancyRate: 0,
      confirmedBookingsTotal: 0,
      canceledBookingsTotal: 0
    },
    fullData: {
      bookings: [],
      contactMessages: []
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await api.admins.getStats(user.token);
        setStats(response);
      } catch (error) {
        console.error("Error al obtener los datos para la interfaz:", error);
        toast.error("Error al obtener los datos para la interfaz");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const recentBookings = stats.fullData.bookings.slice(0, 3);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-sky-500 mb-4">Panel de Administración</h1>
        <p className="text-xl text-blue-500 mb-8">Resumen y estadísticas del hotel</p>
      </motion.section>

      {isLoading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-sky-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-sky-500" />
                </div>
                <span className="text-3xl font-bold text-sky-500">{stats.totals.registeredUsers}</span>
              </div>
              <h3 className="text-slate-600 font-medium">Usuarios Registrados</h3>
              <p className="text-slate-400 text-sm">Total de usuarios en la plataforma</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <CalendarDays className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-3xl font-bold text-orange-500">{stats.totals.totalBookings}</span>
              </div>
              <h3 className="text-slate-600 font-medium">Reservas Totales</h3>
              <p className="text-slate-400 text-sm">Reservas realizadas hasta la fecha</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-3xl font-bold text-blue-500">{stats.totals.testimonials}</span>
              </div>
              <h3 className="text-slate-600 font-medium">Testimonios</h3>
              <p className="text-slate-400 text-sm">Opiniones de huéspedes</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 cursor-pointer" onClick={() => setShowMessages(true)}>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-3xl font-bold text-purple-500">{stats.totals.contactMessages}</span>
              </div>
              <h3 className="text-slate-600 font-medium">Mensajes de Contacto</h3>
              <p className="text-purple-400 text-sm underline">Ver consultas de clientes</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Reservas Recientes</h2>
                <button
                  onClick={() => setShowBookings(true)}
                  className="text-sky-500 hover:text-blue-600 font-medium cursor-pointer"
                >
                  Ver todas
                </button>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-sky-100 p-2 rounded-full">
                        <Hotel className="w-5 h-5 text-sky-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">{booking.nombreHabitacion}</p>
                        <p className="text-sm text-slate-500">
                          {booking.fechaEntrada} - {booking.fechaSalida}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "confirmado" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Estado de Reservas</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-sky-500" />
                      <span className="text-slate-600">Tasa de Ocupación</span>
                    </div>
                    <span className="text-2xl font-bold text-sky-500">{stats.bookingStats.occupancyRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-sky-500 h-2 rounded-full" 
                      style={{ width: `${stats.bookingStats.occupancyRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-600">Confirmadas</span>
                  </div>
                  <span className="text-xl font-bold text-green-500">{stats.bookingStats.confirmedBookingsTotal}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-slate-600">Canceladas</span>
                  </div>
                  <span className="text-xl font-bold text-red-500">{stats.bookingStats.canceledBookingsTotal}</span>
                </div>
              </div>
            </div>
          </motion.section>

          <BookingsModal 
            isOpen={showBookings} 
            onClose={() => setShowBookings(false)} 
            bookings={stats.fullData.bookings} 
          />
          <ContactMessagesModal
            isOpen={showMessages}
            onClose={() => setShowMessages(false)}
            messages={stats.fullData.contactMessages}
          />
        </>
      )}
    </div>
  )
}