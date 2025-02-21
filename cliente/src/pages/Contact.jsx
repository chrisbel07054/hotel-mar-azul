import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import ContactForm from "../components/ContactForm"

export default function Contact() {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-sky-500 mb-4">Contáctanos</h1>
        <p className="text-xl text-blue-500 mb-8">A un paso de contactar con Hotel Mar Azul</p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gray-200 border border-sky-500 rounded-lg shadow-lg p-6 text-black"
        >
          <h2 className="text-2xl font-bold text-sky-500 mb-4">Información de Contacto</h2>
          <ul className="space-y-4">
            <li className="flex items-center text-text">
              <MapPin className="mr-2 text-secondary" />
              123 Playa El Agua, Isla de Margarita, Venezuela
            </li>
            <li className="flex items-center text-text">
              <Phone className="mr-2 text-secondary" />
              +58 295 123 4567
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 text-secondary" />
              info@hotelmarazul.com
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gray-200 border border-sky-500 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-sky-500 mb-4">Envíanos un Mensaje</h2>
          <ContactForm />
        </motion.section>
      </div>
    </div>
  )
}

