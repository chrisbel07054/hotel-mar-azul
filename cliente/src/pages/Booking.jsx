import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Bed, Waves, Coffee, ClipboardList } from "lucide-react"
import { useAuth } from "../contexts/AuthProvider"
import BookingForm from "../components/BookingForm"
import RoomModal from "../components/RoomModal"
import UserBookingsModal from "../components/UserBookingsModal"
import { api } from "../service/apiService"
import toast from "react-hot-toast"

export default function Booking() {
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [userBookingsOpen, setUserBookingsOpen] = useState(false)
  const [rooms, setRooms] = useState([])
  const [userBookings, setUserBookings] = useState([])

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.rooms.getAll()
        setRooms(response.rooms)
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error)
      }
    }

    fetchRooms()
  }, [])

  useEffect(() => {
    if (user && userBookingsOpen) {
      fetchUserBookings()
    }
  }, [userBookingsOpen])
  

  const fetchUserBookings = async () => {
    try {
      const response = await api.bookings.getByUser(user._id, user.token);
      setUserBookings(response.bookings);
    } catch (error) {
      console.error("Error al obtener las reservas del usuario:", error)
    }
  }

  const handleOpenModal = (room) => {
    setSelectedRoom(room)
    setModalOpen(true)
  }

  const handleEditBooking = async (booking) => {
    try {
      await api.bookings.update(booking._id, booking, user.token);
      fetchUserBookings();
      toast.success("Reserva actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      toast.error("Error al actualizar la reserva");
    }
  };
  

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.bookings.delete(bookingId, user.token)
      fetchUserBookings() 
      toast.success("Reserva cancelada con éxito")
    } catch (error) {
      console.error("Error al cancelar la reserva:", error)
      toast.error("Error al cancelar la reserva. Inténtalo de nuevo.")
    }
  }

  const handleBookingSuccess = (newBooking) => {
    setUserBookings([...userBookings, newBooking])
  }

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-sky-500 mb-4">Reserva Ahora</h1>
        <p className="text-xl text-blue-500 mb-8">Experimente el lujo y la comodidad en Hotel Mar Azul</p>
        {user && user.rol !== "admin" && (
          <button
            onClick={() => setUserBookingsOpen(true)}
            className="inline-flex items-center bg-sky-500 hover:bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-full transition-colors"
          >
            <ClipboardList className="w-5 h-5 mr-2" />
            Ver Mis Reservas
          </button>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-sky-500 mb-6">Tipos de Habitaciones</h2>
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {rooms.map((room, index) => (
              <div key={room._id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {index + 1 === 1 && <Bed className="w-6 h-6 text-sky-500 mr-2" />}
                  {index + 1 === 2 && <Coffee className="w-6 h-6 text-sky-500 mr-2" />}
                  {index + 1 === 3 && <Waves className="w-6 h-6 text-sky-500 mr-2" />}
                  <h3 className="text-xl font-bold text-slate-700">{room.nombreHabitacion}</h3>
                </div>
                <p className="text-slate-600 mb-4">{room.extracto}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sky-500 font-bold text-sm">Desde ${room.precio_noche}/noche</p>
                  <button
                    onClick={() => handleOpenModal(room)}
                    className="text-orange-500 hover:text-blue-500 font-medium transition-colors cursor-pointer text-sm"
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Cargando habitaciones...</div>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
      >
        <h2 className="text-2xl font-bold text-sky-500 mb-6">Formulario de Reserva</h2>
        <BookingForm user={user} rooms={rooms} onBookingSuccess={handleBookingSuccess} />
      </motion.section>

      <RoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} room={selectedRoom} />
      <UserBookingsModal
        isOpen={userBookingsOpen}
        onClose={() => setUserBookingsOpen(false)}
        rooms={rooms}
        bookings={userBookings}
        onEditBooking={handleEditBooking}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  )
}

