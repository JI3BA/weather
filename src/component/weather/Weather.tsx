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
    const {forecastWeather, forecastLoading, forecastError} = useTypesSelector(state => state.forecast)
    const {fetchingForecast} = useActions()
    const [temp, setTemp] = useState('℃')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        fetchingWeather()
        fetchingForecast()
        console.log(forecastWeather)
    }, [])

    const handleKeyDown: any = (event: any) => {
        if(event.key === 'Enter'){
            fetchingWeather(inputValue)
            fetchingForecast(inputValue)
            setInputValue('')
        }
    }
    
    const onChangeHandle = (e: any) => {
        setInputValue(e.target.value)
    }
    
    if(error || forecastError){
        return (
        <div>
            <input className='weather-input' type="text" placeholder="city" onKeyDown={handleKeyDown} value={inputValue} onChange={onChangeHandle} maxLength={15} />
            <h1>{error}</h1>
        </div>)
    }

    if(loading || forecastLoading){
        return <p className='weather-loader'></p>
    }

    return (
        <div className="weather">
            <div className="weather-container">
                <div className="weather-header" onKeyDown={handleKeyDown}>
                    <input className='weather-input' type="text" placeholder="city" value={inputValue} onChange={onChangeHandle} maxLength={15} />
                    <div className="weather-btns">
                        <button className="weather-btn btn-cl" onClick={() => setTemp('℃')}>℃</button>
                        <button className="weather-btn btn-fr" onClick={() => setTemp('℉')}>℉</button>
                    </div>
                </div>
                <div className="weather-info-container">
                    {[...weathers].map((weather, index) => 
                        <div key={index} className="weather-info-container">

                            <div className="weather-info-header">
                                <p className="weather-city">{weather.name}, {weather.sys.country}</p>
                                <p className="weather-day">{dayNow}</p>
                            </div>

                            <div className="weather-info-main">
                                <div className="weather-info-main__left">
                                    <div className="weaher-info-main-desc">
                                        <p className="weather-desc__header">{weather.weather[0].main}</p>
                                        <p className="weather-desc">{weather.weather[0].description}</p>
                                    </div>
                                    <img className="weather-desc__image"alt='clouds' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                                </div>
                                <div className="weather-info-main__right">
                                    <p>Sunrise: {new Date(weather.sys.sunrise * 1000).getHours() + ':' 
                                                + (new Date(weather.sys.sunrise * 1000).getMinutes() < 10 ?
                                                   '0' + new Date(weather.sys.sunrise * 1000).getMinutes():
                                                    new Date(weather.sys.sunrise * 1000).getMinutes())} am</p>
                                    {temp === '℃' ?
                                                    <p className="weather-temp">{Math.floor(weather.main.temp - 273.15)}℃</p>
                                                :
                                                    <p className="weather-temp">{Math.floor(((weather.main.temp - 273.15) * (9/5)) + 32)}℉</p>
                                    }
                                    <p>Sunset: {new Date(weather.sys.sunset * 1000).getHours() + ':' 
                                                + (new Date(weather.sys.sunset * 1000).getMinutes() < 10 ? 
                                                    '0' + new Date(weather.sys.sunset * 1000).getMinutes(): 
                                                    new Date(weather.sys.sunset * 1000).getMinutes())} pm</p>
                                </div>
                            </div>

                            <div className="weather-info-footer__container">
                                <div className="weather-info-footer weather-info-footer__temp">
                                    <p className="weather-temp__maxmin">Temp max: <span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                    <span>{Math.floor(weather.main.temp_max - 273.15)}℃</span>
                                                :
                                                    <span>{Math.floor(((weather.main.temp_max - 273.15) * (9/5)) + 32)}℉</span>
                                    }</span></p>
                                    <p className="weather-temp__maxmin">Temp min: <span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                    <span>{Math.floor(weather.main.temp_min - 273.15)}℃</span>
                                                :
                                                    <span>{Math.floor(((weather.main.temp_min - 273.15) * (9/5)) + 32)}℉</span>
                                    }</span></p>
                                </div>
                                <div className="weather-info-footer weather-info-footer__info">
                                    <p className="weather-speed">Speed wind: <span style={{fontWeight: 600}}>{weather.wind.speed}</span> m/s</p>
                                    <p className="weather-pressure">Pressure: <span style={{fontWeight: 600}}>{weather.main.pressure}</span> hPа</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Weather