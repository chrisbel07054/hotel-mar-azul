import { motion, AnimatePresence } from "framer-motion";
import { X, Wifi, Coffee, Bath, Tv } from "lucide-react";



export default function RoomModal({ isOpen, onClose, room }) {
  if (!isOpen || !room) return null;

  const getAmenityIcon = (comodidad) => {
    if (comodidad.includes('wifi')) return <Wifi className="w-5 h-5" />;
    if (comodidad.includes('tv')) return <Tv className="w-5 h-5" />;
    if (comodidad.includes('cocina')) return <Coffee className="w-5 h-5" />;
    if (comodidad.includes('cafetera')) return <Coffee className="w-5 h-5" />;
    return <Bath className="w-5 h-5" />;
  };

  const amenities = room.comodidades.map((comodidad) => ({
    icon: getAmenityIcon(comodidad.toLowerCase()),
    name: comodidad,
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sky-500">{room.nombreHabitacion}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <p className="text-slate-600 mb-6">{room.descripcion}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 mb-6">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2 text-slate-700">
                  <span className="text-sky-500">{amenity?.icon}</span>
                  <span className="text-sm">{amenity.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {room.fotos.map((img, index) => (
                <img
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`Vista ${index + 1} de la habitación`}
                  className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                />
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-6">
              <div>
                <p className="text-sky-500 font-bold text-xl">Desde ${room.precio_noche}/noche</p>
                <p className="text-slate-500 text-sm">Impuestos incluidos</p>
              </div>
              <button
                onClick={onClose}
                className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-3 text-xs rounded-full transition-colors cursor-pointer"
              >
                Reservar Ahora
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
