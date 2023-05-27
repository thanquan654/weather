import React, { useRef } from 'react'
import styles from './Input.module.scss'
import { IoLocationSharp, IoSearchSharp } from 'react-icons/io5'

interface Props {
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    getWeatherData: (city: string) => void,
}

const Input: React.FC<Props> = (props) => {
    // State
    const { inputValue, setInputValue, getWeatherData } = props
    const cityInputRef = useRef<HTMLInputElement>(null)
    
    // Function handle event
    const handleCitySubmit: ()=>void = async () => {
        await getWeatherData(inputValue)
    }


    return (
    <div className={styles.inputSection}>
        <div >
            <IoLocationSharp className={styles.icon}/>
        </div>
        <input
            className={styles.input}
            type="text"
            ref={cityInputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyDown={(e) => {if (e.key === "Enter") handleCitySubmit()}}
        />
        <div 
            className={styles.searchBtn}
            onClick={handleCitySubmit}
        >
            <IoSearchSharp />
        </div>
    </div>
    )
}

export default Input