import axios from "axios"
import dayjs from "dayjs"
import type { CityResult } from "../types/CityResult"

export type CurrentWeather = {
  temperature_2m: number
  wind_speed_10m: number
  weather_code: number
}

export type ForecastDaily = {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
}

export const fetchCurrentWeather = async (city: CityResult): Promise<CurrentWeather> => {
  const { latitude, longitude } = city

  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
  )

  return response.data.current
}

export const fetchForecast = async (city: CityResult): Promise<ForecastDaily> => {
  const { latitude, longitude } = city

  const startDate = dayjs().add(1, "day").format("YYYY-MM-DD") // mañana
  const endDate = dayjs().add(7, "day").format("YYYY-MM-DD") // 7 días desde mañana

  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude,
      longitude,
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      timezone: "auto",
      start_date: startDate,
      end_date: endDate
    }
  })

  return response.data.daily
}

export const fetchCitiesByName = async (query: string): Promise<CityResult[]> => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
    )
    const data = await res.json()
    return data.results || []
  } catch (error) {
    console.error("Error al buscar ciudades:", error)
    return []
  }
}
