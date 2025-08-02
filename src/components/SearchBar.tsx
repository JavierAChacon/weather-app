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
      const current = await fetchCurrentWeather(city)
      setCurrentWeather(current)

      const forecast = await fetchForecast(city)
      setForecastDaily(forecast)
    } catch (err) {
      console.error("Error al obtener datos del clima:", err)
      setCurrentWeather(null)
      setForecastDaily(null)
    }
  }

  return (
    <div className='mx-auto w-1/2 p-4'>
      <div className='flex items-center space-x-2 bg-gray-100 p-2'>
        <CiSearch />
        <input
          className='w-full bg-transparent outline-none'
          placeholder='Buscar ciudad...'
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value)
            setSelectedCity(null)
            setCurrentWeather(null)
            setForecastDaily(null)
          }}
        />
      </div>

      {cityOptions.length > 0 && (
        <ul className='mt-2 max-h-60 overflow-y-auto bg-white text-black shadow'>
          {cityOptions.map((city) => (
            <li
              key={city.id}
              onClick={() => handleCitySelect(city)}
              className='cursor-pointer p-2 hover:bg-gray-200'
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
