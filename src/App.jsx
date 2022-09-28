
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Loading } from './components/Loading'
import WeatherCard from './components/WeatherCard'




function App() {
  
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [Temperature, setTemperature] = useState()
  
  
  
 useEffect(() => {
  //Esta es la funcion que se ejecuta cuando llega la informacion de
  // nuestra peticion
  const success = (pos)  => {
    const obj ={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj); 
 }

 //Esto hace el llamado a la api del navegador,
 //para usar la ubicacon actual
 navigator.geolocation.getCurrentPosition(success) 
 }, [])

  console.log(weather)

  //PEticion del clima 
  useEffect (() => {
    if (coords) {
        const APIKEY = "81deee35ec99d775ade7562fcdc04ec2"
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
        axios.get(URL)
         .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(0)
          const farenheit = (celsius * 9 / 5 + 32).toFixed(0)
          setTemperature({celsius, farenheit})
          setWeather(res.data)
        })  
          .catch(err  => console.log(err))
    }
 },   [coords]) 

  return (
    <div className="App">
      {
        weather ?
          <WeatherCard weather = {weather} temperature = {Temperature} />
        :
        
          <Loading/>
      }
    </div>
    
  )
}



export default App
