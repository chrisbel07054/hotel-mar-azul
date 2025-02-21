import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast"
import { useAuth } from "../contexts/AuthProvider";
import { User, Lock } from "lucide-react";
import { api } from "../service/apiService";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);

      const userData = await api.auth.login(formData);
      login(userData.user);
      toast.success("Bienvenido de nuevo!");

      const from = location.state?.from?.pathname || (userData.rol === "admin" ? "/admin" : "/");
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((err) => {
          toast.error(err.message, { position: 'bottom-right' })
        });
      } else {
        console.log(err?.response);
        toast.error(err?.response?.data?.message || "Error al iniciar sesión.", { position: 'bottom-right' });
      }
    }
  };

  return (
    <div className="h-[calc(100vh-210px)] flex -mx-4 -my-8">
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/7f/cd/57/costa-caribe-beach-hotel.jpg?w=1200&h=-1&s=1"
          alt="Hotel Mar Azul"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl font-bold text-sky-500 mb-6 text-center">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Correo Electrónico"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Contraseña"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-500 text-white py-2 px-6 rounded-full transition-colors cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="mt-4 text-center text-slate-700">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-sky-500 hover:text-sky-600">
              Regístrate aquí
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
