import { motion } from "framer-motion"
import { Award, Users, Leaf, Star, Target, Shield } from "lucide-react"
import { ParallaxBanner } from "react-scroll-parallax"

export default function About() {
  const stats = [
    { number: "35+", label: "Años de Experiencia" },
    { number: "50k+", label: "Huéspedes Satisfechos" },
    { number: "150+", label: "Empleados" },
    { number: "4.8", label: "Calificación Promedio" },
  ]

  const values = [
    {
      icon: Star,
      title: "Excelencia",
      description: "Nos esforzamos por la perfección en cada aspecto de nuestro servicio.",
    },
    {
      icon: Leaf,
      title: "Sostenibilidad",
      description: "Estamos comprometidos con la preservación de la belleza natural de Isla de Margarita.",
    },
    {
      icon: Target,
      title: "Innovación",
      description: "Buscamos continuamente nuevas formas de mejorar la experiencia de nuestros huéspedes.",
    },
    {
      icon: Shield,
      title: "Integridad",
      description: "Conducimos nuestro negocio con honestidad y transparencia.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Apoyamos y nos involucramos con nuestra comunidad local para promover un turismo sostenible.",
    },
    {
      icon: Award,
      title: "Calidad",
      description: "Mantenemos los más altos estándares en todos nuestros servicios e instalaciones.",
    },
  ]

  return (
    <div className="space-y-16 overflow-hidden">
      {/* Hero Section */}
      <ParallaxBanner
        layers={[
          {
            image: "https://felizviaje.com.ve/img/wyndham04.jpg",
            speed: -20,
          },
        ]}
        className="h-[40vh] sm:h-[50vh] md:h-[60vh] relative rounded-b-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Sobre Hotel Mar Azul</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Descubre nuestra historia, misión y compromiso con la excelencia en hospitalidad
            </p>
          </motion.div>
        </div>
      </ParallaxBanner>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl md:text-4xl font-bold text-sky-500 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Historia y Misión */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <div className="group space-y-6">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="https://felizviaje.com.ve/img/wyndham04.jpg"
                alt="Historia del Hotel"
                className="w-full h-48 sm:h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-2xl sm:text-3xl font-bold text-white">
                Nuestra Historia
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed px-2">
              Fundado en 1985, Hotel Mar Azul ha sido un faro de lujo y hospitalidad en Isla de Margarita durante más de
              tres décadas. Lo que comenzó como un pequeño resort familiar se ha convertido en uno de los hoteles más
              prestigiosos de Venezuela.
            </p>
          </div>
          <div className="group space-y-6">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="https://miradorsalud.com/wp-content/uploads/2018/02/hotelmargaritaconcorde_04-1.jpg"
                alt="Misión del Hotel"
                className="w-full h-48 sm:h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h2 className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-2xl sm:text-3xl font-bold text-white">
                Nuestra Misión
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed px-2">
              En Hotel Mar Azul, nuestra misión es proporcionar una experiencia caribeña inolvidable que combine lujo,
              comodidad y la belleza natural de Isla de Margarita, superando las expectativas de nuestros huéspedes.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <value.icon className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sostenibilidad */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-16"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-50 mb-6">
              <Award className="w-8 h-8 text-sky-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Nuestro Compromiso con la Sostenibilidad
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En Hotel Mar Azul, creemos en la importancia de proteger y preservar el hermoso entorno natural de Isla de
              Margarita. Nuestro compromiso con la sostenibilidad se refleja en todas nuestras operaciones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 mb-4">
                  <Leaf className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Iniciativas Ambientales</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1 mr-3">
                    <Leaf className="w-3 h-3 text-sky-500" />
                  </div>
                  <span className="text-gray-600">Uso de energía solar para reducir nuestra huella de carbono</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1 mr-3">
                    <Leaf className="w-3 h-3 text-sky-500" />
                  </div>
                  <span className="text-gray-600">Programas de reciclaje y reducción de residuos</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1 mr-3">
                    <Leaf className="w-3 h-3 text-sky-500" />
                  </div>
                  <span className="text-gray-600">Uso de productos de limpieza ecológicos</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 mb-4">
                  <Users className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compromiso Social</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1 mr-3">
                    <Users className="w-3 h-3 text-sky-500" />
                  </div>
                  <span className="text-gray-600">Apoyo a proveedores locales y sostenibles</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1 mr-3">
                    <Users className="w-3 h-3 text-sky-500" />
                  </div>
                  <span className="text-gray-600">Programas de educación ambiental</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1 mr-3">
                    <Users className="w-3 h-3 text-sky-500" />
                  </div>
                  <span className="text-gray-600">Iniciativas comunitarias locales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

