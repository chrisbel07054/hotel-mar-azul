import { motion } from "framer-motion";

export default function ImageGallery() {
  const images = [
    {
      src: "/images/room-suite2.jpg",
      alt: "Habitación de lujo",
      title: "Habitaciones Elegantes",
      description: "Espacios diseñados para tu máximo confort"
    },
    {
      src: "/images/room-deluxe3.jpg",
      alt: "Piscina",
      title: "Piscina Infinity",
      description: "Relájate con vistas espectaculares"
    },
    {
      src: "/images/resena7.jpg",
      alt: "Restaurante",
      title: "Gastronomía Internacional",
      description: "Experiencias culinarias únicas"
    },
    {
      src: "/images/room-standard2.jpg",
      alt: "Spa",
      title: "Suites Premium",
      description: "Lujo y exclusividad en cada detalle"
    }
  ];

  return (
    <section className='relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-white'></div>
      <div className='container mx-auto px-4 relative'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl md:text-5xl font-bold text-sky-500 mb-4'>
            Nuestras Instalaciones
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Descubre espacios diseñados para brindarte la mejor experiencia
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='aspect-[4/3] overflow-hidden'>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'>
                <div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                  <h3 className='text-white text-xl font-bold mb-2'>
                    {image.title}
                  </h3>
                  <p className='text-white/90 text-sm'>{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
