import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom";
import { Menu, LogIn, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthProvider";
import { ParallaxProvider } from "react-scroll-parallax";

const navItems = [
  { name: "Inicio", path: "/home" },
  { name: "Nosotros", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contacto", path: "/contact" }
];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <header className='bg-white shadow-md'>
        <nav className='container mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <Link
              to='/'
              className='text-2xl font-bold text-sky-500 hover:text-blue-500 transition-colors'
            >
              Hotel Mar Azul
            </Link>

            {/* Menú de escritorio */}
            <div className='hidden lg:flex flex-1 justify-center'>
              <div className='flex items-center space-x-6 px-4'>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-slate-700 hover:text-sky-500 transition-colors ${
                      location.pathname === item.path ? "font-bold" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to='/booking'
                    className={`text-slate-700 hover:text-sky-500 transition-colors ${
                      location.pathname === "/booking" ? "font-bold" : ""
                    }`}
                  >
                    Reservar
                  </Link>
                )}
                {user && user.rol === "admin" && (
                  <Link
                    to='/admin'
                    className={`text-slate-700 hover:text-sky-500 transition-colors ${
                      location.pathname === "/admin" ? "font-bold" : ""
                    }`}
                  >
                    Panel
                  </Link>
                )}
              </div>
            </div>

            {/* Área de usuario en escritorio */}
            <div className='hidden lg:flex items-center space-x-4'>
              {user ? (
                <>
                  <span className='text-slate-700 truncate max-w-[150px]'>
                    <User size={18} className='inline mr-1' />
                    {user.nombre}
                  </span>
                  <button
                    onClick={handleLogout}
                    className='bg-orange-500 hover:bg-blue-500 text-white py-2 px-4 rounded-full transition-colors cursor-pointer'
                  >
                    <LogOut size={18} className='inline mr-1' />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to='/login'
                  className='bg-orange-500 hover:bg-blue-500 text-white py-2 px-4 rounded-full transition-colors'
                >
                  <LogIn size={18} className='inline mr-1' />
                  Iniciar sesión
                </Link>
              )}
            </div>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='lg:hidden text-slate-700 p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className='lg:hidden bg-slate-100 shadow-md'
          >
            <div className='container mx-auto px-4 py-2 space-y-2'>
              {user && (
                <div className='py-2 border-b border-gray-100 mb-2'>
                  <span className='text-slate-700 flex items-center'>
                    <User size={18} className='mr-2 text-orange-500' />
                    <span className='truncate'>{user.nombre}</span>
                  </span>
                </div>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className='block py-2 text-slate-700 hover:text-sky-500 transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link
                  to='/booking'
                  className='block py-2 text-slate-700 hover:text-sky-500 transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservar
                </Link>
              )}
              {user && user.rol === "admin" && (
                <Link
                  to='/admin'
                  className='block py-2 text-slate-700 hover:text-sky-500 transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className='w-full text-left py-2 px-4 bg-orange-500 hover:bg-blue-500 text-white rounded-full transition-colors'
                >
                  <LogOut size={18} className='inline mr-1.5' />
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  to='/login'
                  className='block py-2 px-4 bg-orange-500 hover:bg-blue-500 text-white rounded-full transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={18} className='inline mr-1.5' />
                  Iniciar sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className='flex-grow'>
        <ParallaxProvider>
          <div className='container mx-auto px-4 py-8'>
            <Outlet />
          </div>
        </ParallaxProvider>
      </main>

      <footer className='bg-sky-500 text-white py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4 md:mb-0'>
              <h3 className='text-xl font-bold'>Hotel Mar Azul</h3>
              <p className='text-sm'>Isla de Margarita, Venezuela</p>
            </div>
            <div className='flex space-x-4'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className='text-white hover:text-sky-100 transition-colors'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className='mt-8 text-center text-sm'>
            &copy; {new Date().getFullYear()} Hotel Mar Azul. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

