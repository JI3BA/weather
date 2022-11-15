import React, { FC , useEffect , useState } from "react";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import { useActions } from "../../hooks/useActions";
import './Weather.css'

const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const day = new Date()
let dayNow: string = ''

days.find((item,index) => {
    if(index === day.getDay()){
        dayNow = item
    }
})


const Weather: FC = () => {
    const {weathers, loading, error} = useTypesSelector(state => state.weather)
    const {fetchingWeather} = useActions()
    const [temp, setTemp] = useState('')
    const [inputValue, setInputValue] = useState('')  

    useEffect(() => {
        fetchingWeather()
    }, [])
    
    if(error){
        return <h1>{error}</h1>
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    const handleKeyDown: any = (event: any) => {
        if(event.key === 'Enter'){
            fetchingWeather(inputValue)
            setInputValue('')
        }
    }
    
    const onChangeHandle = (e: any) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="weather">
            <div className="weather-container">
                <div className="weather-header" onKeyDown={handleKeyDown}>
                    <input className='weather-input' type="text" placeholder="city" value={inputValue} onChange={onChangeHandle}/>
                    <div className="weather-btns">
                        <button className="weather-btn btn-cl" onClick={() => setTemp('℃')}>℃</button>
                        <button className="weather-btn btn-fr" onClick={() => setTemp('℉')}>℉</button>
                    </div>
                </div>
                <div className="weather-info-container">
                    {[...weathers].map((weather, index) => 
                        <div key={index} className="weather-info-container">
                            <div className="weather-info-header">
                                <p className="weather-city">{weather.name}</p>
                                <p className="weather-day">{dayNow}</p>
                            </div>
                            <div className="weather-info-main">
                                <div className="weather-info-main__left">
                                    <p className="weather-desc">{weather.weather[0].description}</p>
                                    <img className="weather-desc__image"alt='clouds' src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
                                </div>
                                <div className="weather-info-main__right">
                                    {temp === '℃' ?
                                                    <p className="weather-temp">{Math.floor(weather.main.temp - 273.15)}℃</p>
                                                :
                                                    <p className="weather-temp">{Math.floor(((weather.main.temp - 273.15) * (9/5)) + 32)}℉</p>
                                    }
                                </div>
                            </div>
                            <p className="weather-speed">Speed wind: {weather.wind.speed} m/s</p>
                            <p className="weather-pressure">Pressure: {weather.main.pressure} hPа</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Weather