import type { IconType } from "react-icons"
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiFog,
  WiSprinkle,
  WiShowers,
  WiRain,
  WiSnow,
  WiStormShowers,
  WiThunderstorm
} from "react-icons/wi"

export type WeatherInfo = {
  Icon: IconType
  description: string
}

export const weatherMap: Record<number, WeatherInfo> = {
  0: { Icon: WiDaySunny, description: "Clear sky" },
  1: { Icon: WiDayCloudy, description: "Mainly clear" },
  2: { Icon: WiCloud, description: "Partly cloudy" },
  3: { Icon: WiCloud, description: "Overcast" },
  45: { Icon: WiFog, description: "Fog" },
  48: { Icon: WiFog, description: "Depositing rime fog" },
  51: { Icon: WiSprinkle, description: "Light drizzle" },
  53: { Icon: WiShowers, description: "Moderate drizzle" },
  55: { Icon: WiRain, description: "Dense drizzle" },
  61: { Icon: WiSprinkle, description: "Light rain" },
  63: { Icon: WiRain, description: "Moderate rain" },
  65: { Icon: WiRain, description: "Heavy rain" },
  71: { Icon: WiSnow, description: "Light snow" },
  73: { Icon: WiSnow, description: "Moderate snow" },
  75: { Icon: WiSnow, description: "Heavy snow" },
  80: { Icon: WiShowers, description: "Light showers" },
  81: { Icon: WiRain, description: "Moderate showers" },
  82: { Icon: WiRain, description: "Violent showers" },
  95: { Icon: WiStormShowers, description: "Thunderstorm" },
  96: { Icon: WiThunderstorm, description: "Thunderstorm with hail" },
  99: { Icon: WiThunderstorm, description: "Severe thunderstorm with hail" }
}
