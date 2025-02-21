import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import WeatherWidget from "../components/WeatherWidget"
import { useEffect, useState } from "react"
import { api } from "../service/apiService"

export default function Home() {
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const storedTestimonials = localStorage.getItem("testimonials")

        if (storedTestimonials) {
          setTestimonials(JSON.parse(storedTestimonials))
        } else {
          const response = await api.testimonials.getAll()
          setTestimonials(response.testimonials)
          localStorage.setItem("testimonials", JSON.stringify(response.testimonials))
        }
      } catch (error) {
        console.error("Error al obtener los testimonios:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-sky-500 mb-4">Bienvenido a Hotel Mar Azul</h1>
        <p className="text-xl text-blue-500 mb-8">
          Experimenta el lujo y la comodidad en el corazón de Isla de Margarita
        </p>
        <Link
          to="/booking"
          className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition-colors transform hover:scale-105"
        >
          Reserva Ahora
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-102 transition-transform">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/7f/cd/57/costa-caribe-beach-hotel.jpg?w=1200&h=-1&s=1"
            alt="Hotel Mar Azul Exterior"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-sky-500 mb-2">Alojamiento de Lujo</h2>
            <p className="text-blue-500">
              Disfruta de nuestras espaciosas habitaciones con impresionantes vistas al océano y comodidades modernas.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-102 transition-transform">
          <img
            src="https://irp.cdn-website.com/a109d03d/dms3rep/multi/POOL-09_.jpg"
            alt="Playa de Margarita"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-sky-500 mb-2">Paraíso en tu Puerta</h2>
            <p className="text-blue-500">
              Sumérgete en las cristalinas aguas del Caribe y disfruta de nuestras playas de arena blanca.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-102 transition-transform">
          <WeatherWidget />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-sky-500 mb-4">Testimonios de Huéspedes</h2>
        {isLoading ? (
          <div className="text-center text-gray-500">Cargando testimonios...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-slate-900 p-4 rounded-lg hover:shadow-md transition-shadow">
                <p className="text-sky-100 mb-2">{testimonial.comentario}</p>
                <p className="text-sm text-orange-500 font-bold">- {testimonial.usuario_nombre}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/testimonials"
            className="bg-orange-500 hover:bg-blue-500 text-white py-3 px-6 rounded-full transition-colors cursor-pointer"
          >
            Ver más testimonios
          </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-sky-500 mb-4">Nuestras Instalaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="transform hover:scale-105 transition-transform">
            <img
              src="https://www.adondealirio.com/wp-content/uploads/2020/12/puntaplaya2.jpg"
              alt="Piscina"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-bold text-sky-500">Piscina Infinita</h3>
            <p className="text-blue-500">Relájate en nuestra piscina con vistas al océano</p>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/4a/27/6c/ld-plus-palm-beach.jpg?w=1200&h=-1&s=1"
              alt="Restaurante"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-bold text-sky-500">Restaurante Gourmet</h3>
            <p className="text-blue-500">Disfruta de la mejor gastronomía local e internacional</p>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <img
              src="https://www.avendanorealty.com/wp-content/uploads/2023/02/vacaciones-en-familia-en-la-isla-de-margarita.jpg"
              alt="Spa"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-bold text-sky-500">Spa de Lujo</h3>
            <p className="text-blue-500">Renuévate con nuestros tratamientos de spa</p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

