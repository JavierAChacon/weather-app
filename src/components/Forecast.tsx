import { useWeatherStore } from "../store/useWeatherStore"
import { weatherMap } from "../constants/weatherMap"

const Forecast = () => {
  const forecast = useWeatherStore((state) => state.forecastDaily)

  if (!forecast) return null

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-semibold'>Pronóstico Extendido (7 días)</h2>
      <div className='grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3'>
        {forecast.time.map((date, i) => {
          const code = forecast.weather_code[i]
          const info = weatherMap[code] || { icon: "❓", description: "Desconocido" }

          return (
            <div key={date} className='rounded border bg-gray-100 p-4'>
              <p className='text-base font-semibold'>{date}</p>
              <p>🌡️ Máx: {forecast.temperature_2m_max[i]} °C</p>
              <p>🌡️ Mín: {forecast.temperature_2m_min[i]} °C</p>
              <p>
                {info.icon} {info.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Forecast
