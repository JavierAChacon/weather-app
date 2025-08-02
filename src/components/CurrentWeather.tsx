import { useWeatherStore } from "../store/useWeatherStore"
import { weatherMap } from "../constants/weatherMap"
import { WiStrongWind } from "react-icons/wi"

const CurrentWeather = () => {
  const { cityName, currentWeather, isLoading } = useWeatherStore()

  if (isLoading) {
    return (
      <div className='mx-auto mt-6 w-full max-w-md animate-pulse rounded-xl bg-slate-700 p-6 text-white shadow-md'>
        <div className='mx-auto mb-4 h-6 w-1/2 rounded bg-slate-600'></div>

        <div className='flex flex-col items-center gap-4'>
          <div className='h-14 w-20 rounded bg-slate-600'></div>
          <div className='h-5 w-32 rounded bg-slate-600'></div>
        </div>

        <div className='mt-4 flex items-center justify-center gap-2'>
          <div className='h-5 w-24 rounded bg-slate-600'></div>
        </div>
      </div>
    )
  }

  if (!currentWeather) return null

  const { temperature_2m, wind_speed_10m, weather_code } = currentWeather
  const info = weatherMap[weather_code] || {
    description: "Unknown"
  }

  return (
    <section>
      <div className='mx-auto mt-6 w-full max-w-md rounded-xl bg-slate-700 p-6 text-white shadow-md'>
        <h3 className='mb-4 text-center text-xl font-bold tracking-wide'>{cityName}</h3>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-5xl font-light'>{temperature_2m}°</p>
          <p className='text-lg text-slate-300 capitalize'>{info.description.toLowerCase()}</p>
        </div>

        <div className='mt-4 flex items-center justify-center gap-2 text-slate-400'>
          <WiStrongWind className='text-2xl' />
          <p className='text-sm'>Wind: {wind_speed_10m} km/h</p>
        </div>
      </div>
    </section>
  )
}

export default CurrentWeather
