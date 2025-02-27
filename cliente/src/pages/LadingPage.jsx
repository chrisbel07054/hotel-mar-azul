import { motion } from "framer-motion";
import HeroSection from "../components/ladingPage/HeroSection";
import WeatherWidget from "../components/WeatherWidget";
import ImageGallery from "../components/ladingPage/ImageGallery";
import SubscriptionForm from "../components/ladingPage/SubscriptionForm";
import { Link } from "react-router-dom";

export default function LadingPage() {
  return (
    <main className='min-h-screen bg-white'>
      <HeroSection />

      <section className='container mx-auto px-4 py-8 md:py-16 relative -mt-10 md:-mt-20'>
        <div className='bg-white rounded-xl shadow-2xl p-6 md:p-10'>
          <div className='grid gap-6 md:grid-cols-2 items-center'>
            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-500'>
                Bienvenido al Hotel Mar Azul
              </h2>
              <p className='text-gray-600 md:text-lg'>
                Donde encontrarás una experiencia inigualable. Disfruta de
                nuestras modernas instalaciones, servicios de alta calidad y una
                ubicación privilegiada.
              </p>
              <Link
                to='/home'
                className='bg-orange-500 hover:bg-blue-500 text-white py-3 px-6 rounded-full transition-colors cursor-pointer'
              >
                Reserva ahora
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WeatherWidget />
            </motion.div>
          </div>
        </div>
      </section>

      <ImageGallery />
      <SubscriptionForm />
    </main>
  );
}
