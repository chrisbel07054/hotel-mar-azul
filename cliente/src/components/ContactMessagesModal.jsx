import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, User, Calendar, MessageSquare } from 'lucide-react'

export default function ContactMessagesModal({ isOpen, onClose, messages }) {
  if (!isOpen) return null


  const formatDate = (dateString) => {
    const fecha = new Date(dateString);
    const año = fecha.getFullYear();
    const mes = (`0${fecha.getMonth() + 1}`).slice(-2); // Añadir cero inicial si es necesario
    const dia = (`0${fecha.getDate()}`).slice(-2); // Añadir cero inicial si es necesario
    return `${dia}-${mes}-${año}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl w-full sm:max-w-4xl max-h-[90vh] m-4 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-500">Mensajes de Contacto</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-4 sm:p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-sky-500 flex-shrink-0" />
                        <span className="font-medium text-gray-900">{message.nombre}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-sky-500 flex-shrink-0" />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
                      <a 
                        href={`mailto:${message.correo}`} 
                        className="text-sky-500 hover:underline text-sm sm:text-base break-all"
                      >
                        {message.correo}
                      </a>
                    </div>

                    <div className="flex space-x-3">
                      <MessageSquare className="w-5 h-5 text-sky-500 flex-shrink-0" />
                      <p className="text-gray-600 text-sm sm:text-base">{message.mensaje}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
