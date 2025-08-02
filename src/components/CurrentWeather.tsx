import { useWeatherStore } from "../store/useWeatherStore"
import { weatherMap } from "../constants/weatherMap"

const CurrentWeather = () => {
  const { cityName, currentWeather } = useWeatherStore()

  if (!currentWeather) return null

  const { temperature_2m, wind_speed_10m, weather_code } = currentWeather
  const info = weatherMap[weather_code] || {
    icon: "❓",
    description: "Desconocido"
  }

  return (
    <div className='mt-6 rounded border bg-blue-100 p-4 text-sm'>
      <h3 className='text-lg font-semibold'>Clima actual en {cityName}:</h3>
      <p>🌡️ Temperatura: {temperature_2m} °C</p>
      <p>💨 Viento: {wind_speed_10m} km/h</p>
      <p>
        {info.icon} Estado: {info.description}
      </p>
    </div>
  )
}

export default CurrentWeather
