import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { useDebounce } from "use-debounce"
import { useWeatherStore } from "../store/useWeatherStore"
import { fetchCurrentWeather, fetchForecast, fetchCitiesByName } from "../services/open-meteo"
import type { CityResult } from "../types/CityResult"

const SearchBar = () => {
  const setCityName = useWeatherStore((state) => state.setCityName)
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather)
  const setForecastDaily = useWeatherStore((state) => state.setForecastDaily)
  const setIsLoading = useWeatherStore((state) => state.setIsLoading)
  const setError = useWeatherStore((state) => state.setError)

  const [cityQuery, setCityQuery] = useState("")
  const [debouncedCityQuery] = useDebounce(cityQuery, 300)
  const [cityOptions, setCityOptions] = useState<CityResult[]>([])
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)

  useEffect(() => {
    const getCities = async () => {
      if (debouncedCityQuery.trim().length < 1 || selectedCity) {
        setCityOptions([])
        return
      }

      const cities = await fetchCitiesByName(debouncedCityQuery)
      setCityOptions(cities)
    }

    getCities()
  }, [debouncedCityQuery, selectedCity])

  const handleCitySelect = async (city: CityResult) => {
    const fullName = `${city.name}, ${city.country}`
    setCityQuery(fullName)
    setSelectedCity(city)
    setCityOptions([])

    setCityName(fullName)
    setCurrentWeather(null)
    setForecastDaily(null)

    localStorage.setItem("lastCity", JSON.stringify(city))

    try {
      setIsLoading(true)
      setError(null)

      const current = await fetchCurrentWeather(city)
      setCurrentWeather(current)

      const forecast = await fetchForecast(city)
      setForecastDaily(forecast)
    } catch (err) {
      console.error("Error al obtener datos del clima:", err)
      setError("No se pudo obtener el clima para la ciudad seleccionada.")
      setCurrentWeather(null)
      setForecastDaily(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative mx-auto my-6 flex w-full max-w-xl flex-col'>
      <div className='flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 shadow-md ring-blue-500 focus-within:ring-2'>
        <CiSearch className='text-xl text-slate-300' />
        <input
          type='text'
          placeholder='Search city...'
          className='w-full bg-transparent px-2 py-1 text-white placeholder-slate-400 focus:outline-none'
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value)
            setSelectedCity(null)
          }}
        />
      </div>

      {cityOptions.length > 0 && (
        <ul className='absolute top-14 z-10 w-full rounded-md bg-slate-700 shadow-lg'>
          {cityOptions.map((city) => (
            <li
              key={`${city.name}-${city.latitude}-${city.longitude}`}
              className='cursor-pointer px-4 py-2 text-white hover:bg-slate-600'
              onClick={() => handleCitySelect(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
