import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "./components/Layout"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"
import Booking from "./pages/Booking"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Testimonials from "./pages/Testimonials"
import Register from "./pages/Register"
import { AuthProvider } from "./contexts/AuthProvider"
import LandingPage from "./pages/LadingPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />

          {/* Rutas con Layout */}
          <Route element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route
              path='/booking'
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path='/admin'
              element={
                <PrivateRoute adminOnly>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster position='top-right' />
      </Router>
    </AuthProvider>
  );
}

export default App;
