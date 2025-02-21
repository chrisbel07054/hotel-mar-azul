import { IdCard, Lock, Mail, MapPin, Phone, User } from "lucide-react"

export const inputsRegister = [
    { label: "Nombre", name: "nombre", icon: User, placeholder: "Ingrese su nombre completo", },
    { label: "Correo Electrónico", name: "email", icon: Mail, type: "email", placeholder: "ejemplo@correo.com" },
    { label: "Contraseña", name: "password", icon: Lock, type: "password", placeholder: "Mínimo 6 caracteres" },
    { label: "Ciudad", name: "city", icon: MapPin, placeholder: "Ingrese su ciudad" },
    { label: "Teléfono", name: "phone", icon: Phone,  placeholder: "0000000" },
    { label: "Cédula", name: "cedula", icon: IdCard, placeholder: "XXXXXXX" }
]