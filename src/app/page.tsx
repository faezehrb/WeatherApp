'use client';

import { getCurrentWeather } from './services/api';
import { useState } from 'react';
import { WeatherData } from './types/server';
import CustomDropdown from './components/dropdown'; // Adjust the path if necessary

// Define the City type to match the props expected by CustomDropdown
interface City {
  id: number;
  name: string;
  lat: string;
  lon: string;
}

// Sample list of cities
const cities = [
  { id: 1, name: 'Tehran', lat: '35.7219', lon: '51.3347' },
  { id: 2, name: 'Ahvaz', lat: '31.3183', lon: '48.6706' },
  { id: 3, name: 'Ardabil', lat: '38.2432', lon: '48.2976' },
];

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  // Handle change function for dropdown
  const handleChange = (e: { target: { value: string } }) => {
    const selectedLocation: City = JSON.parse(e.target.value);
    getCurrentWeather({
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
    }).then((res) => {
      setWeatherData(res);
    });
  };

  return (
    <div className="w-3/4 h-3/4 border-4 border-white rounded-lg flex items-center justify-between flex-col">
      <h1 className="text-[2rem] text-center bg-white w-2/6 text-[#4b5563] mb-16 px-7 py-2 rounded-b-lg">
        Weather App
      </h1>

      {/* Replaced the native select with CustomDropdown */}
      <div className="text-[1.5rem] w-2/6 mb-4">
        <CustomDropdown cities={cities} handleChange={handleChange} />
      </div>

      <div className="bg-white rounded-t-lg h-96 w-2/6 flex items-start justify-center flex-col">
        <h3 className="text-[1.5rem] text-[#4b5563] m-4">
          Pressure: {weatherData?.main.pressure}
        </h3>
        <h3 className="text-[1.5rem] text-[#4b5563] m-4">
          Temp: {weatherData?.main.temp}
        </h3>
        <h3 className="text-[1.5rem] text-[#4b5563] m-4">
          Wind Speed: {weatherData?.wind.speed}
        </h3>
      </div>
    </div>
  );
}