import { useEffect } from "react"
import SearchBar from "./components/SearchBar"
import CurrentWeather from "./components/CurrentWeather"
import Forecast from "./components/Forecast"
import { useWeatherStore } from "./store/useWeatherStore"
import { fetchCurrentWeather, fetchForecast } from "./services/open-meteo"
import type { CityResult } from "./types/CityResult"

function App() {
  const setCityName = useWeatherStore((state) => state.setCityName)
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather)
  const setForecastDaily = useWeatherStore((state) => state.setForecastDaily)

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity")
    if (!savedCity) return

    const city: CityResult = JSON.parse(savedCity)
    const fullName = `${city.name}, ${city.country}`
    setCityName(fullName)

    const fetchData = async () => {
      try {
        const current = await fetchCurrentWeather(city)
        const forecast = await fetchForecast(city)
        setCurrentWeather(current)
        setForecastDaily(forecast)
      } catch (err) {
        console.error("Error cargando datos desde localStorage:", err)
      }
    }

    fetchData()
  }, [setCityName, setCurrentWeather, setForecastDaily])

  return (
    <div className='text-center text-3xl font-bold'>
      <h1>Weather App</h1>
      <SearchBar />
      <CurrentWeather />
      <Forecast />
    </div>
  )
}

export default App
