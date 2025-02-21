import { useState } from "react"
import { Calendar, Users, Home } from "lucide-react"
import ConfirmationModal from "./ConfirmationModal"
import toast from "react-hot-toast"
import { bookingSchema } from "../utils/zodSchemas"
import { z } from "zod"

export default function BookingForm({ user, rooms, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    fechaEntrada: "",
    fechaSalida: "",
    huespedes: 1,
    nombreHabitacion: "",
  })
  const [errors, setErrors] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [maxHuespedes, setMaxHuespedes] = useState(5)

  const today = new Date().toISOString().split("T")[0]
  const minCheckoutDate = formData.fechaEntrada ? new Date(formData.fechaEntrada).toISOString().split("T")[0] : today

  const calcularPrecioTotal = (fechaEntrada, fechaSalida, tipoHabitacion) => {
    const inicio = new Date(fechaEntrada)
    const fin = new Date(fechaSalida)
    const noches = (fin - inicio) / (1000 * 60 * 60 * 24);
    const habitacionSeleccionada = rooms.find((room) => room.nombreHabitacion.toLowerCase() === tipoHabitacion)
    const precioPorNoche = habitacionSeleccionada ? habitacionSeleccionada.precio_noche : 0
    return noches * precioPorNoche
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "nombreHabitacion") {
      const habitacionSeleccionada = rooms.find((room) => room.nombreHabitacion.toLowerCase() === value.toLowerCase());
      const max_huespedes = habitacionSeleccionada ? habitacionSeleccionada.maximo_huespedes : 0;
  
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        huespedes: prev.huespedes > max_huespedes ? max_huespedes : prev.huespedes,
      }));
  
      if (habitacionSeleccionada) {
        setMaxHuespedes(habitacionSeleccionada.maximo_huespedes);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "huespedes" ? Number.parseInt(value) : value,
        ...(name === "fechaEntrada" && prev.fechaSalida && new Date(value) >= new Date(prev.fechaSalida)
          ? { fechaSalida: "" }
          : {}),
      }));
    }
  
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const validatedData = bookingSchema.parse(formData)
      const precioTotal = calcularPrecioTotal(
        validatedData.fechaEntrada,
        validatedData.fechaSalida,
        validatedData.nombreHabitacion,
      )

      const habitacionSeleccionada = rooms.find(
        (room) => room.nombreHabitacion.toLowerCase() === validatedData.nombreHabitacion,
      )

      setBookingDetails({
        ...validatedData,
        monto_pagado: precioTotal,
        nombreHabitacion: habitacionSeleccionada ? habitacionSeleccionada.nombreHabitacion : "",
        precioPorNoche: habitacionSeleccionada ? habitacionSeleccionada.precio_noche : 0,
        usuarioId: user._id,
        token: user.token,
        email: user.email
      })

      setShowConfirmation(true)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      } else {
        console.error("Error desconocido:", error)
        toast.error("Ocurrió un error inesperado.")
      }
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fechaEntrada" className="block text-sm font-medium text-gray-700">
              Fecha de Entrada
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-5 w-5" />
              <input
                type="date"
                id="fechaEntrada"
                name="fechaEntrada"
                value={formData.fechaEntrada}
                onChange={handleChange}
                min={today}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            {errors.fechaEntrada && <p className="text-sm text-red-500">{errors.fechaEntrada}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="fechaSalida" className="block text-sm font-medium text-gray-700">
              Fecha de Salida
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-5 w-5" />
              <input
                type="date"
                id="fechaSalida"
                name="fechaSalida"
                value={formData.fechaSalida}
                onChange={handleChange}
                min={minCheckoutDate}
                disabled={!formData.fechaEntrada}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            {errors.fechaSalida && <p className="text-sm text-red-500">{errors.fechaSalida}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="nombreHabitacion" className="block text-sm font-medium text-gray-700">
              Tipo de Habitación
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-5 w-5" />
              <select
                id="nombreHabitacion"
                name="nombreHabitacion"
                value={formData.nombreHabitacion}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Seleccionar tipo de habitación</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room.nombreHabitacion.toLowerCase()}>
                    {room.nombreHabitacion}
                  </option>
                ))}
              </select>
            </div>
            {errors.nombreHabitacion && <p className="text-sm text-red-500">{errors.nombreHabitacion}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="huespedes" className="block text-sm font-medium text-gray-700">
              Número de Huéspedes
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 h-5 w-5" />
              <select
                id="huespedes"
                name="huespedes"
                value={formData.huespedes}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {Array.from({ length: maxHuespedes }, (_, index) => index + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "persona" : "personas"}
                  </option>
                ))}
              </select>
            </div>
            {errors.huespedes && <p className="text-sm text-red-500">{errors.huespedes}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-colors cursor-pointer"
          >
            Reservar Ahora
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        bookingDetails={bookingDetails}
        onBookingSuccess={onBookingSuccess}
        setFormData={setFormData}
      />
    </>
  )
}

