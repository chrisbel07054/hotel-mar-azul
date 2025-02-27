import { motion } from "framer-motion";
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <section className='relative h-[500px] flex items-center justify-center overflow-hidden'>
      <img
        src='/images/room-suite2.jpg'
        alt='Hotel Mar Azul'
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-black opacity-50' />{" "}
      {/* Oscurecer la imagen */}
      <motion.div
        className='relative z-10 text-center text-white space-y-6 p-4 max-w-4xl mx-auto'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-sky-500'>
          Hotel Mar Azul Lujo y Comodidad
        </h1>
        <p className='text-lg md:text-xl max-w-2xl mx-auto'>
          Una experiencia única en un entorno paradisíaco
        </p>
        <Link
          to='/home'
          className='bg-orange-500 hover:bg-blue-500 text-white py-3 px-6 rounded-full transition-colors cursor-pointer'
        >
          Reserva ahora
        </Link>
      </motion.div>
    </section>
  );
}
