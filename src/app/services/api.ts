import axios from "axios";

const APIKey = "2e6adf700cd25b43c952169bd8ef9d30";

const client = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5"
})

export async function getCurrentWeather({lat, lon}: {lat: string, lon: string}){
   const {data} = await client(`/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`)
   return data
} 