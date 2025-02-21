import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, MessageSquarePlus, Star } from "lucide-react"
import { useAuth } from "../contexts/AuthProvider"
import ReviewModal from "../components/ReviewModal"
import {api} from '../service/apiService';
import { toast } from "react-hot-toast"



const itemsPerPage = 6;
export default function Testimonials() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const storedTestimonials = localStorage.getItem('testimonials');
        
        if (storedTestimonials) {
          setTestimonials(JSON.parse(storedTestimonials));
        } else {
          const response = await api.testimonials.getAll();
          setTestimonials(response.testimonials);
          localStorage.setItem('testimonials', JSON.stringify(response.testimonials));
        }
      } catch (error) {
        console.error("Error al obtener los testimonios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testimonials.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleReviewSubmit = async (data) => {
    try {
      const response = await api.testimonials.create(data, user.token);
      const newTestimonial = response.testimonial;

      setTestimonials((prevTestimonials) => {
        const updatedTestimonials = [...prevTestimonials, newTestimonial];
        localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
        return updatedTestimonials;
      });

      toast.success('¡Reseña enviada con éxito!', {position: 'bottom-right'});
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      toast.error(error?.response?.data?.message || 'Hubo un error al enviar la reseña. Por favor, inténtalo de nuevo.', {position: 'bottom-right'});
    } finally {
      setIsReviewModalOpen(false);
    }
  };
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-sky-500 mb-4">Testimonios de Nuestros Huéspedes</h1>
        <p className="text-xl text-blue-500 mb-8">
          Descubre lo que nuestros huéspedes dicen sobre su experiencia en Hotel Mar Azul
        </p>
        {user && user.rol !== "admin" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsReviewModalOpen(true)}
            className="fixed bottom-8 right-8 z-10 bg-orange-500 hover:bg-blue-500 text-white px-4 py-3 rounded-full cursor-pointer shadow-lg transition-colors flex items-center gap-2 sm:static sm:mt-4 sm:mx-auto sm:shadow-none"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span className="hidden sm:inline">Dar mi Opinión</span>
          </motion.button>
        )}
      </motion.section>

      {isLoading ? (
        <div className="text-center text-gray-500">Cargando testimonios...</div>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentItems.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
              <img
                src={`/images/resena${index+1}.${index+1 === 5 ? 'webp' : 'jpg'}`}
                alt={`Testimonio de ${testimonial.usuario_nombre}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <p className="text-slate-900 mb-4 flex-1">{testimonial.comentario}</p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-sky-500 font-bold">{testimonial.usuario_nombre}</p>
                  <div className="flex">
                    {[...Array(testimonial.calificacion)].map((_, i) => (
                      <Star key={i} className="text-orange-500 h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.section>
      )}

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`bg-orange-500 text-white px-4 py-2 rounded-full ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600 cursor-pointer"
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-deep-sea">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`bg-orange-500 text-white px-4 py-2 rounded-full ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600 cursor-pointer"
          }`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}

