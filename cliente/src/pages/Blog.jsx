import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogModal from "../components/BlogModal";
import { api } from '../service/apiService';
import { toast } from 'react-hot-toast';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingNotificacion, setIsSendingNotificacion] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.blogs.getAll();
        setBlogPosts(response.blogs);
      } catch (error) {
        console.error("Error al obtener los blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    setIsSendingNotificacion(true);
    try {
      await api.notifications.subscriptionBlog({ email });
      toast.success("¡Suscripción exitosa!");
      setEmail("");
    } catch (error) {
      toast.error("Error al suscribirse, por favor intenta de nuevo.");
    } finally {
      setIsSendingNotificacion(false);
    }
  };

  return (
    <div className='space-y-12'>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <h1 className='text-4xl md:text-6xl font-bold text-sky-500 mb-4'>
          Blog del Hotel Mar Azul
        </h1>
        <p className='text-xl text-blue-500 mb-8'>
          Mantente actualizado con las últimas noticias y consejos de viaje para
          Isla de Margarita
        </p>
      </motion.section>

      {isLoading ? (
        <div className='text-center text-gray-500'>Cargando blogs...</div>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * post.id, duration: 0.5 }}
              className='bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow'
            >
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={post.imagen || "/placeholder.svg"}
                  alt={post.title}
                  className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-6'>
                <h2 className='text-2xl font-bold text-sky-500 mb-2'>
                  {post.titulo}
                </h2>
                <p className='text-gray-600 mb-4'>{post.extracto}</p>
                <button
                  onClick={() => handleOpenModal(post)}
                  className='inline-flex items-center bg-orange-500 hover:bg-blue-500 text-white py-2 px-4 rounded-full transition-colors cursor-pointer'
                >
                  Leer más
                </button>
              </div>
            </motion.article>
          ))}
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className='bg-white rounded-lg shadow-lg p-6'
      >
        <h2 className='text-2xl font-bold text-sky-500 mb-4'>
          Suscríbete a Nuestro Newsletter
        </h2>
        <p className='text-gray-600 mb-4'>
          Recibe las últimas noticias, ofertas especiales y consejos de viaje
          directamente en tu bandeja de entrada.
        </p>
        <form
          className='flex flex-col md:flex-row gap-4'
          onSubmit={handleSubscription}
        >
          <input
            type='email'
            placeholder='Tu correo electrónico'
            className='flex-grow px-4 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type='submit'
            disabled={isSendingNotificacion}
            className={`py-2 px-4 rounded-full transition-colors cursor-pointer ${
              isSendingNotificacion
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-orange-500 hover:bg-blue-500 text-white"
            }`}
          >
            {isSendingNotificacion ? "Enviando" : "Suscribirse"}
          </button>
        </form>
      </motion.section>

      <BlogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
}