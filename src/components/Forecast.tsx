import { useWeatherStore } from "../store/useWeatherStore"
import { weatherMap } from "../constants/weatherMap"
import dayjs from "dayjs"
import { PiThermometerCold, PiThermometerHot } from "react-icons/pi"

const Forecast = () => {
  const forecastDaily = useWeatherStore((state) => state.forecastDaily)
  const isLoading = useWeatherStore((state) => state.isLoading)

  if (isLoading) {
    return (
      <div className='p-4'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className='flex animate-pulse flex-col items-center rounded-xl bg-slate-700 p-5 text-slate-200 shadow-lg'
            >
              <div className='mb-3 h-12 w-12 rounded-full bg-slate-600'></div>
              <div className='mb-1 h-4 w-24 rounded bg-slate-600'></div>
              <div className='mb-2 h-3 w-16 rounded bg-slate-600'></div>
              <div className='mb-3 h-4 w-20 rounded bg-slate-600'></div>

              <div className='mt-4 w-full space-y-2'>
                <div className='h-3 w-full rounded bg-slate-600'></div>
                <div className='h-3 w-full rounded bg-slate-600'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!forecastDaily) return null

  return (
    <div className='grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
      {forecastDaily.time.map((date, index) => {
        const code = forecastDaily.weather_code[index]
        const min = forecastDaily.temperature_2m_min[index]
        const max = forecastDaily.temperature_2m_max[index]
        const weather = weatherMap[code]

        return (
          <div
            key={date}
            className='flex flex-col items-center rounded-xl bg-[#1E293B] p-5 text-slate-200 shadow-lg transition duration-200 hover:bg-[#334155]'
          >
            {weather?.Icon && <weather.Icon size={56} className='mb-3 text-blue-200' />}
            <p className='text-base font-semibold tracking-wide'>{dayjs(date).format("dddd")}</p>
            <p className='mb-1 text-sm text-slate-400'>{dayjs(date).format("MMMM D")}</p>
            <p className='mt-1 text-base italic'>{weather?.description}</p>

            <div className='mt-4 space-y-1 text-sm text-blue-200'>
              <div className='flex items-center gap-2'>
                <PiThermometerCold size={18} />
                <span>Min: {min}°C</span>
              </div>
              <div className='flex items-center gap-2'>
                <PiThermometerHot size={18} />
                <span>Max: {max}°C</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Forecast
