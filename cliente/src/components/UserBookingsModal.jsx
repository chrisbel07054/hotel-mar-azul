import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, Calendar, Home, CheckCircle, XCircle, Users, DollarSign, Edit2, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { ShowCancelBookingToast } from "../utils/toastCancelBooking"
import { bookingSchema } from "../utils/zodSchemas"
import { z } from "zod"


const today = new Date().toISOString().split("T")[0];

export default function UserBookingsModal({ isOpen, onClose, bookings, onEditBooking, onCancelBooking, rooms }) {
  const [editingBooking, setEditingBooking] = useState(null)
  const [editForm, setEditForm] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    huespedes: 0,
    nombreHabitacion: "",
  })

  const maximo_huespedes = editForm.nombreHabitacion === "Habitación Estándar" ? 3 : editForm.nombreHabitacion === "Habitación Deluxe" ? 4 : 5

  const calcularPrecioTotal = (fechaEntrada, fechaSalida, tipoHabitacion) => {
    const inicio = new Date(fechaEntrada);
    const fin = new Date(fechaSalida);
    const noches = (fin - inicio) / (1000 * 60 * 60 * 24);
    const habitacionSeleccionada = rooms.find((room) => room.nombreHabitacion.toLowerCase() === tipoHabitacion);
    const precioPorNoche = habitacionSeleccionada ? habitacionSeleccionada.precio_noche : 0;
    return noches * precioPorNoche;
  }
  

  const handleEdit = (booking) => {
    setEditingBooking(booking)
    setEditForm({
      fechaEntrada: booking.fechaEntrada,
      fechaSalida: booking.fechaSalida,
      huespedes: booking.huespedes,
      nombreHabitacion: booking.nombreHabitacion,
    })
  }

  const handleSaveEdit = () => {
    try {
      const nombreHabitacion = editForm.nombreHabitacion.toLowerCase();
      const validatedData = bookingSchema.parse({...editForm, nombreHabitacion});
      const precioTotal = calcularPrecioTotal(
        validatedData.fechaEntrada,
        validatedData.fechaSalida,
        nombreHabitacion,
      );
  
      onEditBooking({
        ...editForm,
        monto_pagado: precioTotal,
        _id: editingBooking?._id
      });
      setEditingBooking(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        console.error("Error desconocido:", error);
        toast.error("Ocurrió un error inesperado.");
      }
    }
  };

  const handleCancel = (bookingId) => {
    ShowCancelBookingToast(onCancelBooking, bookingId);
  };

  const minCheckInDate = today <= editForm.fechaEntrada ? today : editForm.fechaEntrada;
  const minCheckoutDate = editForm.fechaEntrada 
    ? new Date(new Date(editForm.fechaEntrada).getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : today;


  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-4xl mx-auto h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-bold text-sky-500">Mis Reservas</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {
              bookings.length === 0 
              ? 
                <div className="flex items-center justify-center h-full">
                  <p className="text-center text-gray-500 text-xl">Aún no has creado alguna reserva</p>
              </div>  
              :  <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden"
                >
                  {editingBooking?._id === booking._id ? (
                    <div className="p-6 space-y-6">
                      <h3 className="text-lg font-semibold text-sky-500 mb-4">Editar Reserva</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Check-in</label>
                          <input
                            type="date"
                            min={minCheckInDate}
                            value={editForm.fechaEntrada}
                            onChange={(e) => setEditForm({ ...editForm, fechaEntrada: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Check-out</label>
                          <input
                            type="date"
                            min={minCheckoutDate}
                            value={editForm.fechaSalida}
                            onChange={(e) => setEditForm({ ...editForm, fechaSalida: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Huéspedes</label>
                          <select
                            value={editForm.huespedes}
                            onChange={(e) => setEditForm({ ...editForm, huespedes: Number(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                          >
                           {Array.from({ length: maximo_huespedes }, (_, index) => index + 1).map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "persona" : "personas"}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Habitación</label>
                          <select
                            value={editForm.nombreHabitacion}
                            onChange={(e) => {
                              const nombreHabitacion = e.target.value;
                              const max_huespedes = nombreHabitacion === "Habitación Estándar" ? 3 : nombreHabitacion === "Habitación Deluxe" ? 4 : 5;
                            
                              setEditForm((prevForm) => ({
                                ...prevForm,
                                nombreHabitacion,
                                huespedes: prevForm.huespedes > max_huespedes ? max_huespedes : prevForm.huespedes
                              }));
                            }}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                          >
                            {
                              rooms.map((room) => (
                                <option key={room._id} value={room.nombreHabitacion}>{room.nombreHabitacion}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          onClick={() => setEditingBooking(null)}
                          className="px-4 py-2 text-gray-700 cursor-pointer bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-2 text-white cursor-pointer bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* Detalles de la Reserva */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-sky-500">Detalles de la Reserva</h3>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-sky-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Check-in</p>
                                  <p className="font-medium">{booking.fechaEntrada}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-sky-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Check-out</p>
                                  <p className="font-medium">{booking.fechaSalida}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Información de la Habitación */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-sky-500">Habitación</h3>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Home className="w-5 h-5 text-sky-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Tipo</p>
                                  <p className="font-medium">{booking.nombreHabitacion}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Users className="w-5 h-5 text-sky-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Huéspedes</p>
                                  <p className="font-medium">
                                    {booking.huespedes} {booking.huespedes === 1 ? "persona" : "personas"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Estado y Precio */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-sky-500">Estado</h3>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <DollarSign className="w-5 h-5 text-sky-500" />
                                <div>
                                  <p className="text-sm text-gray-500">Monto</p>
                                  <p className="font-medium">${booking.monto_pagado}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {booking.status === "confirmado" ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : booking.status === "cancelado" ? (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-yellow-500" />
                                )}
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    booking.status === "confirmado"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                        
                                  }`}
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {booking.status === "confirmado" && (
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                          <button
                            onClick={() => handleEdit(booking)}
                            className="inline-flex items-center px-4 py-2 text-sm cursor-pointer font-medium text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="inline-flex items-center px-4 py-2 text-sm cursor-pointer font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
                </div>
            }
           
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

