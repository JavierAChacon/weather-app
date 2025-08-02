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
  cityName: string
  setCityName: (name: string) => void
  setCurrentWeather: (weather: CurrentWeather | null) => void
  forecastDaily: ForecastDaily | null
  setForecastDaily: (forecast: ForecastDaily | null) => void
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  currentWeather: null,
  cityName: "",
  setCityName: (name) => set({ cityName: name }),
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  forecastDaily: null,
  setForecastDaily: (forecast) => set({ forecastDaily: forecast })
}))
