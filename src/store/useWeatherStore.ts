import { create } from "zustand"

type CurrentWeather = {
  temperature_2m: number
  wind_speed_10m: number
  weather_code: number
}

type ForecastDaily = {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
}

type WeatherStore = {
  currentWeather: CurrentWeather | null
  forecastDaily: ForecastDaily | null
  cityName: string
  isLoading: boolean
  error: string | null
  setCityName: (name: string) => void
  setCurrentWeather: (weather: CurrentWeather | null) => void
  setForecastDaily: (forecast: ForecastDaily | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  currentWeather: null,
  forecastDaily: null,
  cityName: "",
  isLoading: false,
  error: null,
  setCityName: (name) => set({ cityName: name }),
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setForecastDaily: (forecast) => set({ forecastDaily: forecast }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}))
