
'use client'

import Image from "next/image";
import { json } from "stream/consumers";
import { getCurrentWeather } from "./services/api"
import { useState } from "react";
import { WeatherData } from './types/server'

  interface City {
    id: number;
    name: string;
    lat: string;
    lon: string;
  }

 const cities = [
  {id: 1, name: 'tehran', lat: "354300.12", lon:"512400.00"},
  {id: 2, name: 'ahvaz', lat: "31.3183", lon:"48.6706"},
  {id: 3, name: 'ardabil', lat: "38.2432", lon:"48.2976"},
 ];

export default function Home() {

  const [weatherData, setWeatherData] = useState<WeatherData>()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const { value } = e.target;
    const selectedLocation: City = JSON.parse(value)
    getCurrentWeather({lat: selectedLocation.lat, lon: selectedLocation.lon}).then((res) => {
      setWeatherData(res);
    })
  }

  return (
    <>
      <h1>Weather App</h1>

      <h3>Pressure: {weatherData?.main.pressure}</h3>
      <h3>Temp: {weatherData?.main.temp}</h3>
      <h3>Wind Speed: {weatherData?.wind.speed}</h3>

      <select onChange={handleChange}>
        {
          cities.map(item => 
              <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
            )
        }
      </select>
    </>
  )
}
