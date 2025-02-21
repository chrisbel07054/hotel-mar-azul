import { X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function BlogModal({ isOpen, onClose, post }) {
  if (!post) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 p-4 overflow-y-auto flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="relative">
              <img
                src={post.imagen || "/placeholder.svg"}
                alt={post.titulo}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <h2 className="text-2xl sm:text-3xl font-bold text-sky-500 mb-4">{post.titulo}</h2>
              <div className="prose prose-sky max-w-none">
                <p className="text-gray-600 leading-relaxed">{post.contenido}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
