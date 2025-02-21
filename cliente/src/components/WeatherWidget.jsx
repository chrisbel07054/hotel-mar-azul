import { useState, useEffect } from "react"
import { Cloud, Droplets, Sun, Wind, Eye, Thermometer, Gauge } from "lucide-react"
import { api } from "../service/apiService"

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
}

const weatherDescriptions = {
  "clear sky": "Cielo despejado",
  "few clouds": "Pocas nubes",
  "scattered clouds": "Nubes dispersas",
  "broken clouds": "Nublado parcial",
  "overcast clouds": "Nublado",
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      try {
        const response = await api.weather.getWeather()
        setWeather(response)
      } catch (error) {
        console.error("Error al obtener los datos del clima:", error)
        setError("Error al cargar los datos del clima")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-lg">{error}</p>
      </div>
    )
  }

  if (!weather || !weather.weather || !weather.main) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-lg">No se pudo cargar la información del clima</p>
      </div>
    )
  }

  const WeatherIcon = weatherIcons[weather.weather[0].main] || Cloud
  const description = weatherDescriptions[weather.weather[0].description] || weather.weather[0].description

  return (
    <div className="h-full">
      <div className="h-full bg-gradient-to-br from-sky-800 to-slate-900 text-white p-4 rounded-xl">
        <div className="space-y-4 md:space-y-6">
          {/* Ubicación y Clima Principal */}
          <div className="flex flex-col md:items-center">
            <h2 className="text-xl font-bold text-center">{weather.name}</h2>
            <p className="text-sky-200 capitalize text-center">{description}</p>
            <WeatherIcon className="h-8 w-8 text-sky-200 mx-auto mt-2" />
          </div>

          {/* Temperatura Principal y Sensación Térmica */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-5xl font-bold">{Math.round(weather.main.temp)}°C</span>
            <div className="flex items-center gap-2 text-sky-200">
              <Thermometer className="h-4 w-4" />
              <span className="text-sm">Sensación: {Math.round(weather.main.feels_like)}°C</span>
            </div>
          </div>

          {/* Temperaturas Min/Max */}
          <div className="flex justify-around gap-8 text-sm">
            <div className="text-center">
              <p className="text-sky-200">Mín</p>
              <p className="font-semibold">{Math.round(weather.main.temp_min)}°C</p>
            </div>
            <div className="text-center">
              <p className="text-sky-200">Máx</p>
              <p className="font-semibold">{Math.round(weather.main.temp_max)}°C</p>
            </div>
          </div>

          {/* Información Adicional del Clima */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sky-700/30">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-sky-200 flex-shrink-0" />
              <div>
                <p className="text-sky-200 text-xs">Humedad</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Wind className="h-5 w-5 text-sky-200 flex-shrink-0" />
              <div>
                <p className="text-sky-200 text-xs">Viento</p>
                <p className="font-semibold">{Math.round(weather.wind.speed)} m/s</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-sky-200 flex-shrink-0" />
              <div>
                <p className="text-sky-200 text-xs">Visibilidad</p>
                <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <div>
                <div className="flex gap-2">
                <Gauge className="h-5 w-5 text-sky-200 flex-shrink-0 text-right" />
                <p className="text-sky-200 text-xs text-right">Presión</p>
                </div>
                <p className="font-semibold text-right">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget

