import { useState } from "react";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { api } from '../service/apiService';

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.string().email("Dirección de correo electrónico inválida"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      contactSchema.parse(formData);
      await api.contacts.create(formData);
      toast.success("¡Mensaje enviado con éxito!");
      setFormData({ nombre: "", correo: "", mensaje: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error?.response?.data?.message || 'Hubo un error. Por favor, inténtalo de nuevo.', { position: 'bottom-right' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sky-500 mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md border-sky-500"
          required
        />
      </div>
      <div>
        <label htmlFor="correo" className="block text-sky-500 mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo Electrónico"
          value={formData.correo}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md border-sky-500"
          required
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-sky-500 mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows="4"
          placeholder="Escribe tu mensaje..."
          className="w-full px-3 py-2 border rounded-md border-sky-500"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className={`bg-orange-500 hover:bg-blue-500 text-white py-2 px-6 rounded-full transition-colors cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}
