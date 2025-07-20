# React Weather App

A weather application built with React and Vite that allows users to search for and view current weather conditions and forecasts.

## Features

- Search for weather by city name
- View current weather conditions including temperature, humidity, wind speed, and weather description
- View 5-day forecast (if implemented in the project)

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Configuration

You need an API key from [OpenWeather](https://openweathermap.org/api). Once you have it, create a `.env` file in the root directory and add:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## Running the Project

To start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Technologies Used

- React
- Vite
- TypeScript
- OpenWeather API