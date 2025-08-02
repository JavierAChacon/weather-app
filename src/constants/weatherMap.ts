export type WeatherInfo = {
  icon: string
  description: string
}

export const weatherMap: Record<number, WeatherInfo> = {
  0: { icon: "☀️", description: "Despejado" },
  1: { icon: "🌤️", description: "Mayormente despejado" },
  2: { icon: "⛅", description: "Parcialmente nublado" },
  3: { icon: "☁️", description: "Nublado" },
  45: { icon: "🌫️", description: "Niebla" },
  48: { icon: "🌫️", description: "Niebla con escarcha" },
  51: { icon: "🌦️", description: "Llovizna ligera" },
  53: { icon: "🌧️", description: "Llovizna moderada" },
  55: { icon: "🌧️", description: "Llovizna intensa" },
  61: { icon: "🌦️", description: "Lluvia ligera" },
  63: { icon: "🌧️", description: "Lluvia moderada" },
  65: { icon: "🌧️", description: "Lluvia intensa" },
  71: { icon: "🌨️", description: "Nieve ligera" },
  73: { icon: "🌨️", description: "Nieve moderada" },
  75: { icon: "❄️", description: "Nieve intensa" },
  80: { icon: "🌦️", description: "Chubascos ligeros" },
  81: { icon: "🌧️", description: "Chubascos moderados" },
  82: { icon: "🌧️", description: "Chubascos fuertes" },
  95: { icon: "⛈️", description: "Tormenta eléctrica" },
  96: { icon: "⛈️", description: "Tormenta con granizo" },
  99: { icon: "🌩️", description: "Tormenta fuerte con granizo" }
}
