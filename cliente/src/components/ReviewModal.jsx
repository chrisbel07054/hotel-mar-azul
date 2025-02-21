import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star } from "lucide-react"
import { z } from "zod"

const reviewSchema = z.object({
  usuario_nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  comentario: z.string().min(10, "El comentario debe tener al menos 10 caracteres"),
  calificacion: z.number().min(1).max(5),
})

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    usuario_nombre: "",
    comentario: "",
    calificacion: 5,
  })
  const [errors, setErrors] = useState({})
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const handleStarClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      calificacion: rating,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      const validatedData = reviewSchema.parse(formData)
      onSubmit(validatedData)
      // Resetear el formulario
      setFormData({
        usuario_nombre: "",
        comentario: "",
        calificacion: 5,
      })
      setErrors({})
      onClose()
    } catch (error) {
      const newErrors = {}
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message
      })
      setErrors(newErrors)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-500">Dar mi Opinión</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="usuario_nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="usuario_nombre"
                  name="usuario_nombre"
                  type="text"
                  value={formData.usuario_nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Tu nombre"
                />
                {errors.usuario_nombre && <p className="text-sm text-red-500">{errors.usuario_nombre}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="comentario" className="block text-sm font-medium text-gray-700">
                  Comentario
                </label>
                <textarea
                  id="comentario"
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Cuéntanos tu experiencia"
                />
                {errors.comentario && <p className="text-sm text-red-500">{errors.comentario}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Calificación</label>
                <div className="flex flex-wrap items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 sm:w-8 h-6 sm:h-8 ${
                          star <= (hoveredStar || formData.calificacion)
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">{formData.calificacion}/5</span>
                </div>
                {errors.calificacion && <p className="text-sm text-red-500">{errors.calificacion}</p>}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-sky-500 rounded-lg hover:bg-sky-600 cursor-pointer transition-colors w-full sm:w-auto"
                >
                  Enviar Reseña
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

