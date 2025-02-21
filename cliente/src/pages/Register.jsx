import { motion } from "framer-motion"
import { useState } from "react"
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { api } from "../service/apiService"
import { z } from "zod"
import { inputsRegister } from "../utils/inputsRegister"


const schemaRegister = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  city: z.string().min(1, "La ciudad es requerida"),
  phone: z.string().min(11, "El teléfono debe tener al menos 11 dígitos"),
  cedula: z.string().min(7, "La cédula debe tener al menos 7 dígitos"),
})


export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    cedula: "",
  })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      schemaRegister.parse(formData)
      const response = await api.auth.register(formData)
      login(response.user)
      toast.success(response.message)
      navigate("/", { replace: true })
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message, {position: 'bottom-right'})
        })
      } else {
        console.log(error?.response)
        toast.error(error?.response?.data?.message || "Error en el registro", {position: 'bottom-right'})
      }
    }
  }

  return (
    <div className="min-h-screen flex -mx-4 -my-8">
      <div className="hidden lg:block md:w-1/2 relative">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/7f/cd/57/costa-caribe-beach-hotel.jpg?w=1200&h=-1&s=1"
          alt="Hotel Mar Azul"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 pt-12 md:px-8 lg:px-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl py-8 mt-4 md:mt-0"
        >
          <div className="text-center -mt-20 md:-mt-10">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-500">Registro</h1>
            <p className="mt-2 text-gray-600">Crea tu cuenta para empezar a reservar</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6">
              {inputsRegister.map(({ label, name, type, icon: Icon, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon className="h-5 w-5 text-sky-500" aria-hidden="true" />
                    </div>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      placeholder={placeholder}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border cursor-pointer border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                Crear Cuenta
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium text-sky-500 hover:text-sky-600 transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

