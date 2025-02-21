import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, User, CheckCircle, XCircle } from "lucide-react"

export default function BookingsModal({ isOpen, onClose, bookings }) {
  if (!isOpen) return null

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmado":
        return "bg-green-100 text-green-700 border-green-200"
      case "cancelado":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-bold text-sky-500">Lista de Reservas</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="space-y-8">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Detalles de la Reserva */}
                      <div className="space-y-6">
                        <h3 className="text-base font-semibold text-sky-500 flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Detalles de la Reserva
                        </h3>
                        <div className="grid gap-4 bg-gray-50 p-4 rounded-xl">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Check-in</p>
                            <p className="font-medium text-gray-900">{booking.fechaEntrada}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Check-out</p>
                            <p className="font-medium text-gray-900">{booking.fechaSalida}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Habitación</p>
                            <p className="font-medium text-gray-900">{booking.nombreHabitacion}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Huéspedes</p>
                            <p className="font-medium text-gray-900">{booking.huespedes} {booking.huespedes === 1 ? 'persona' : 'personas'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Información del Huésped */}
                      <div className="space-y-6">
                        <h3 className="text-base font-semibold text-sky-500 flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Información del Huésped
                        </h3>
                        <div className="grid gap-4 bg-gray-50 p-4 rounded-xl">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Nombre</p>
                            <p className="font-medium text-gray-900">{booking.usuarioId.nombre}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Cédula</p>
                            <p className="font-medium text-gray-900">{booking.usuarioId.cedula}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{booking.usuarioId.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                            <p className="font-medium text-gray-900">{booking.usuarioId.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Estado y Ubicación */}
                      <div className="space-y-6">
                        <h3 className="text-base font-semibold text-sky-500 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Estado y Ubicación
                        </h3>
                        <div className="grid gap-4 bg-gray-50 p-4 rounded-xl">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Ciudad</p>
                            <p className="font-medium text-gray-900">{booking.usuarioId.city}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Monto</p>
                            <p className="font-medium text-gray-900">${booking.monto_pagado}</p>
                          </div>
                          <div className="pt-2">
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                                booking.status,
                              )}`}
                            >
                              {booking.status.toLowerCase() === "confirmado" ? (
                                <CheckCircle className="w-4 h-4 mr-2" />
                              ) : (
                                <XCircle className="w-4 h-4 mr-2" />
                              )}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

