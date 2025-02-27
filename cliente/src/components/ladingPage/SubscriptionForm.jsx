import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { api } from "../../service/apiService";

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscription = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await api.notifications.subscriptionBlog({ email });
      toast.success(resp.message);
      setEmail("");
    } catch (error) {
      toast.error("Error al suscribirse, por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='relative overflow-hidden pt-16 md:pt-24 pb-4'>
      <div className='container mx-auto px-4 relative'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            className='bg-white rounded-3xl shadow-2xl overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='relative p-8 md:p-12'>
              <div className='relative'>
                <div className='text-center mb-8'>
                  <h2 className='text-3xl md:text-4xl font-bold text-sky-500 mb-4'>
                    Suscríbete a nuestras ofertas exclusivas
                  </h2>
                  <p className='text-gray-600 max-w-2xl mx-auto'>
                    Recibe promociones especiales y descuentos únicos
                    directamente en tu correo
                  </p>
                </div>

                <form
                  onSubmit={handleSubscription}
                  className='max-w-md mx-auto space-y-4'
                >
                  <div className='relative'>
                    <input
                      type='email'
                      placeholder='Tu correo electrónico'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none ring-2 ring-sky-500 transition-all duration-300'
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-full transition-colors cursor-pointer ${
                      loading
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-blue-500 text-white"
                    }`}
                  >
                    {loading ? "Enviando..." : "Suscribirse"}
                  </button>
                </form>
                <div className='mt-4 text-center text-sm text-gray-500'>
                  Al suscribirte, aceptas recibir correos promocionales. *
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
