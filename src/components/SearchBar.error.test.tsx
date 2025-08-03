import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import SearchBar from "./SearchBar"
import { describe, it, expect } from "vitest"

vi.mock("../store/useWeatherStore", () => {
  const store: {
    error: string | null
    isLoading: boolean
    setCityName: () => void
    setCurrentWeather: () => void
    setForecastDaily: () => void
    setIsLoading: () => void
    setError: (msg: string | null) => void
  } = {
    setCityName: vi.fn(),
    setCurrentWeather: vi.fn(),
    setForecastDaily: vi.fn(),
    setIsLoading: vi.fn(),
    setError: (msg) => (store.error = msg),
    error: "Could not fetch weather for the selected city.",
    isLoading: false
  }

  const useWeatherStore = (selector?: (s: typeof store) => unknown) =>
    selector ? selector(store) : store

  return { useWeatherStore }
})

vi.mock("../services/open-meteo", () => ({
  fetchCitiesByName: vi.fn(),
  fetchCurrentWeather: vi.fn(),
  fetchForecast: vi.fn()
}))

describe("SearchBar — error state", () => {
  it("shows the English error message when error exists in store", () => {
    render(<SearchBar />)

    expect(screen.getByText(/could not fetch weather for the selected city/i)).toBeInTheDocument()
  })
})
