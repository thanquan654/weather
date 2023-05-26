import { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './App.module.scss'
import Input from './components/Input/Input';
import Weather from './components/Weather/Weather';

interface WeatherData {
  location: {
    name: string
  },
  current: {
    temp_c: number,
    feelslike_c: number,
    condition: {
      text: string,
      icon: string,
    },
    wind_kph: number,
    humidity: number,
    uv: number,
    air_quality: {
      pm2_5: number
    }
  }
}

const App: React.FC = () => {
  const API_KEY = "7d0b49df55a94c1babb32549232605"

  // State
  const [ inputValue, setInputValue ] = useState<string>("Ha Noi");
  const [ weatherData, setWeatherData ] = useState<WeatherData | null>(null)
  const [ loading, setLoading ] = useState<boolean>(true)

  // Function
  const getWeatherData: (city: string) => void = async (city) => {
    setLoading(true)
    await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`)    
      .then((res)=> {
        setWeatherData(res.data)
      })
      .catch(() => {
        setWeatherData(null)
      })
    setLoading(false)
  }

  useEffect(() => {
    
    getWeatherData(inputValue) 
  }, [])
  

  return (
    <div className={styles.bg}>
      <section className={styles.cardContainer}>
        <Input 
          inputValue={inputValue}
          setInputValue={setInputValue}
          getWeatherData={getWeatherData}
        />
        <Weather 
          weatherData={weatherData}
          loading={loading}
        />
      </section>
    </div>
  )
}

export default App
