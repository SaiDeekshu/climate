# Weather App

Simple weather application using TypeScript and OpenWeatherMap API.

## Structure

- `src/app.ts` – TypeScript source
- `dist/app.js` – transpiled JavaScript
- `index.html` – main page
- `style.css` – styles
- `tsconfig.json` – TS configuration (strict)

## Setup

1. Sign up at [OpenWeatherMap](https://openweathermap.org/) and generate a free API key.
2. Open `src/app.ts` and replace the `YOUR_API_KEY_HERE` placeholder with your actual key:
   ```ts
   const apiKey: string = "your_real_key_here";
   ```
3. Compile TypeScript:
   ```bash
   npx tsc
   ```
3. Serve files using `live-server` or any static server:
   ```bash
   live-server
   ```

## Features

- Enter city name and fetch current weather
- Displays name, temperature (°C), description, icon
- Loading indicator and error messages
- Animated background with Particles.js
- Glassmorphism card & gradient background

Responsive and beginner-friendly UI.
