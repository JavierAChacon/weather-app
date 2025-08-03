import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // describe / it / expect globales
    environment: "jsdom", // entorno DOM simulado
    setupFiles: "./src/setupTests.ts", // se ejecuta antes de cada test
    css: false
  }
})
