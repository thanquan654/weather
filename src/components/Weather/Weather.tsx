import React from 'react'
import styles from './Weather.module.scss'
import { FiWind } from 'react-icons/fi'
import { WiHumidity, WiDust } from 'react-icons/wi'
import { HiSun } from 'react-icons/hi'
import Loading from '../Loading/Loading'




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
interface Props {
    weatherData: WeatherData | null,
    loading: boolean
}

const Weather: React.FC<Props> = (props) => {
    const { weatherData, loading } = props

    // Choose image
    const mess: string|undefined = weatherData?.current.condition.text.toLowerCase()
    let imgSrc: string|undefined = ""
    const weatherStatus: string[] = [ "clear", "cloud", "mist", "rain", "snow"]
    weatherStatus.forEach((status: string) => {
      if (mess?.includes(status)) imgSrc=`${status}.png`
    }) 

    
  if (weatherData) {  
    return (
        <>
        {loading && <Loading />}
        <div className={styles.weatherSection}>
          <img src={imgSrc} className={styles.img} />
          <div className={styles.temp}>
            {weatherData.current.temp_c}
            <sup>°C</sup>
          </div>
          <div className={styles.message}>{weatherData.current.condition.text}</div>
          <div className={styles.moreInfo}>
            {/* Wind Speed */}
            <div className={styles.infoItem}>
              <div className={styles.left}>
                <FiWind />
              </div>
              <div className={styles.right}>
                <div className={styles.info}>{weatherData.current.wind_kph}<span>Km/h</span></div>
                <div className={styles.name}>Wind Speed</div>
              </div>
            </div>
            {/* Humidity */}
            <div className={styles.infoItem}>
              <div className={styles.left}>
                <WiHumidity />
              </div>
              <div className={styles.right}>
                <div className={styles.info}>{weatherData.current.humidity}<span>%</span></div>
                <div className={styles.name}>Humidity</div>
              </div>
            </div>
            {/* UV */}
            <div className={styles.infoItem}>
              <div className={styles.left}>
                <HiSun />
              </div>
              <div className={styles.right}>
                <div className={styles.info}>{weatherData.current.uv}<span>mW/cm2</span></div>
                <div className={styles.name}>UV</div>
              </div>
            </div>
            {/* PM 2.5 */}
            <div className={styles.infoItem}>
              <div className={styles.left}>
                <WiDust />
              </div>
              <div className={styles.right}>
                <div className={styles.info}>{(weatherData.current.air_quality.pm2_5).toFixed(1)}<span>μg/m3</span></div>
                <div className={styles.name}>PM 2.5</div>
              </div>
            </div>
          </div>
        </div>
        </>
      )
  } else {
    return (
      <>
      {loading && <Loading />}
      <div className={styles.weatherSection}>
          <img className={styles.img} src='./public/404.png'></img>
          <span className={styles.errMessage}>No matching location found!</span>
      </div>
      </>
    )
  }
  
}

export default Weather