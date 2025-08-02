import { useEffect } from "react"
import SearchBar from "./components/SearchBar"
import CurrentWeather from "./components/CurrentWeather"
import Forecast from "./components/Forecast"
import Welcome from "./components/Welcome"
import { useWeatherStore } from "./store/useWeatherStore"
import { fetchCurrentWeather, fetchForecast } from "./services/open-meteo"
import type { CityResult } from "./types/CityResult"

function App() {
  const setCityName = useWeatherStore((state) => state.setCityName)
  const setCurrentWeather = useWeatherStore((state) => state.setCurrentWeather)
  const setForecastDaily = useWeatherStore((state) => state.setForecastDaily)
  const currentWeather = useWeatherStore((state) => state.currentWeather)
  const forecastDaily = useWeatherStore((state) => state.forecastDaily)
  const setIsLoading = useWeatherStore((state) => state.setIsLoading)

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity")
    if (!savedCity) return

    const city: CityResult = JSON.parse(savedCity)
    const fullName = `${city.name}, ${city.country}`
    setCityName(fullName)

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const current = await fetchCurrentWeather(city)
        const forecast = await fetchForecast(city)
        setCurrentWeather(current)
        setForecastDaily(forecast)
      } catch (err) {
        console.error("Error cargando datos desde localStorage:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [setCityName, setCurrentWeather, setForecastDaily, setIsLoading])

  return (
    <div className='min-h-screen bg-[#100E1D] font-sans text-white'>
      <SearchBar />
      {!currentWeather && !forecastDaily ? (
        <Welcome />
      ) : (
        <>
          <CurrentWeather />
          <Forecast />
        </>
      )}
    </div>
  )
}

export default App
