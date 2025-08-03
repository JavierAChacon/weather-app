# Weather App ☀️🌧️

> **Prueba técnica – Frontend Intern (React)**
> Aplicación que consume **Open‑Meteo** para mostrar el clima actual y el pronóstico de los próximos 7 días.

---

## 1. Requisitos funcionales — ✅ Cumplidos

| 🔹 Funcionalidad               | Implementación                                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Búsqueda de ciudad**         | `SearchBar` con autocompletado (API de geocodificación de Open‑Meteo). `debounce` 300 ms para optimizar las llamadas de la API. |
| **Clima actual**               | `CurrentWeather` muestra → ciudad, temperatura °C, viento km/h, descripción textual.                             |
| **Pronóstico 7 días**          | `Forecast` renderiza 7 tarjetas con fecha, mín, máx y descripción/ícono.                                         |
| **Estados de carga y error**   | Skeleton pulsante durante fetch (`isLoading`) y mensaje rojo en errores (`error`).                               |
| **Persistencia última ciudad** | LocalStorage (`lastCity`) + carga automática al iniciar la app.                                                  |

---

## 2. Requisitos técnicos

| Aspecto              | Elección                                                                             | Justificación                                                         |
| -------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **UI/UX**            | Tailwind CSS                                                                         | Prototipado veloz y responsive; clases ordenadas vía plugin Prettier. |
| **Lógica React**     | Componentes funcionales + Hooks.                                                     |                                                                       |
| **Manejo de estado** | **Zustand** → simple, sin boilerplate y escalable (ver sección “¿Por qué Zustand?”). |                                                                       |
| **Asincronía + API** | `services/open‑meteo.ts` centraliza llamadas `fetch*`, manejo de errores y tipado.   |                                                                       |
| **TypeScript**       | Tipos estrictos (CityResult, CurrentWeather, ForecastDaily).                         |                                                                       |
| **Tests**            | Vitest + React‑Testing‑Library (render, errores, loaders).                           |                                                                       |

---

## 3. Criterios de evaluación — Cómo se cubren

| Criterio                     | Evidencia en código                                                |
| ---------------------------- | ------------------------------------------------------------------ |
| Cumple requisitos            | Tabla “Requisitos funcionales” (100 %).                            |
| Estructura de componentes    | Carpeta `components/`, cada vista en un archivo + `Welcome`.       |
| Manejo de estado justificado | Sección “¿Por qué Zustand?” + store de 30 LoC.                     |
| Asincronía bien gestionada   | Skeleton loaders + mensajes de error; servicios aislados.          |
| Código limpio                | ESLint (airbnb/ts) sin warnings; Prettier consistente; commitlint. |

---

## 4. Puntos extra implementados ✅

- **TypeScript** en todo el proyecto.
- **Pruebas unitarias** con Vitest + RTL.
- **Responsive** (mobile → desktop).
- **Persistencia** de la última ciudad (localStorage).
- **Hooks + componentes funcionales**.
- **Zustand** como solución ligera, documentada y argumentada.

---

## 5. Stack técnico

| Categoría | Herramienta         | Motivo                                                   |
| --------- | ------------------- | -------------------------------------------------------- |
| Framework | React + Vite        | Dev‑server rápido y bundler moderno.                     |
| Lenguaje  | TypeScript          | Tipado estático y DX superior.                           |
| Estilos   | Tailwind CSS        | Utilidades primero; plugin Prettier para ordenar clases. |
| Estado    | **Zustand**         | <30 LoC; sin reducers; ideal para esta escala.           |
| Fechas    | **dayjs**           | \~2 kB, formatea fechas y construye rangos.              |
| Tests     | Vitest + RTL        | Rápidos; mismo ecosistema Vite.                          |
| Íconos    | react‑icons/wi & pi | SVGs livianos para clima y UI.                           |

> **¿Por qué Zustand?**
>
> - API vía hooks (`useWeatherStore`) ⇒ mismo patrón que `useState`.
> - Cero providers o reducers; sólo composicionar selectores.
> - Permite persistencia y middlewares sin re‑escribir lógica.
> - Para esta app (1 pantalla, 5 flags) Redux Toolkit sería sobreingeniería.

---

## 6. Inicio rápido

```bash
# Instalación
git clone <repo> && cd weather-app
npm install
npm run dev      # http://localhost:5173
```

### Comandos útiles

| Script            | Descripción                               |
| ----------------- | ----------------------------------------- |
| `npm run lint`    | ESLint sin warnings (`--max-warnings=0`). |
| `npm run format`  | Prettier + orden de clases Tailwind.      |
| `npm run test`    | Vitest (unit).                            |
| `npm run test:ui` | UI interactiva de Vitest.                 |

Husky lanza lint-staged y commitlint en cada commit (Conv Commits).

---

## 7. Manual de usuario

1. Teclee una ciudad en la barra de búsqueda y elija una opción.
2. Verá el **Clima actual** y el **Pronóstico de 7 días**.
3. La ciudad queda guardada y se recarga automáticamente la próxima vez.
4. Si hay fallo de red o ciudad errónea, aparece un mensaje rojo y puede intentar de nuevo.

---

## 8. Estructura de carpetas (resumen)

```
src/
 ├─ components/          # UI (SearchBar, CurrentWeather, Forecast, Welcome)
 ├─ constants/           # data estático (weatherMap)
 ├─ services/            # llamadas HTTP (open-meteo.ts)
 ├─ store/               # Zustand store
 ├─ types/               # tipos TS (CityResult, …)
 ├─ setupTests.ts        # jest-dom + RTL
 ├─ assets/              # logos, imagenes
 └─ App.tsx
```
