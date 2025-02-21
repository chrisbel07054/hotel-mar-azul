import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Users } from "lucide-react"
import { api } from "../service/apiService"
import toast from "react-hot-toast"
import { useState } from "react"
import { formatDate } from "../utils/formatDate"

export default function ConfirmationModal({ isOpen, onClose, bookingDetails, onBookingSuccess, setFormData }) {
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !bookingDetails) return null


  const calcularDias = () => {
    const inicio = new Date(bookingDetails.fechaEntrada)
    const fin = new Date(bookingDetails.fechaSalida)
    return Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24))
  }

  const onConfirm = async () => {
    setIsLoading(true)
    try {
      const response = await api.bookings.create(bookingDetails, bookingDetails.token)
      toast.success(response.message)
      onBookingSuccess(response);
      setFormData({ // reiniciar el formulario.
        fechaEntrada: "",
        fechaSalida: "",
        huespedes: 1,
        nombreHabitacion: "",
      })
      onClose() 
    } catch (error) {
      console.error("Error al crear la reserva:", error)
      toast.error(error?.response?.data?.message || "Error al crear la reserva. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 pt-4 flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Confirmar Reserva</h2>
              <p className="text-gray-500 text-sm">{bookingDetails.nombreHabitacion}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pt-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="w-5 h-5 text-sky-500" />
                <div>
                  <p className="text-gray-600">Check-in</p>
                  <p className="font-medium">{formatDate(bookingDetails.fechaEntrada)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="w-5 h-5 text-sky-500" />
                <div>
                  <p className="text-gray-600">Check-out</p>
                  <p className="font-medium">{formatDate(bookingDetails.fechaSalida)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Users className="w-5 h-5 text-sky-500" />
                <div>
                  <p className="text-gray-600">Huéspedes</p>
                  <p className="font-medium">
                    {bookingDetails.huespedes} {bookingDetails.huespedes === 1 ? "persona" : "personas"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {calcularDias()} {calcularDias() === 1 ? 'noche' : 'noches'} x ${bookingDetails.precioPorNoche}
                </span>
                <span className="font-medium">${bookingDetails.monto_pagado}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span className="text-lg text-sky-500">${bookingDetails.monto_pagado}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-400" : "bg-orange-500 hover:bg-sky-500"
              } text-white py-2 text-xs rounded-xl font-medium transition-colors cursor-pointer`}
            >
              {isLoading ? "Procesando..." : "Confirmar y Pagar"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

