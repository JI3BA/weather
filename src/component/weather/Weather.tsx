import React, { FC , useEffect , useState } from "react";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import { useActions } from "../../hooks/useActions";
import './Weather.css'

const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const Weather: FC = () => {
    const {weathers, loading, error} = useTypesSelector(state => state.weather)
    const {fetchingWeather} = useActions()
    const {forecastWeather, forecastLoading, forecastError} = useTypesSelector(state => state.forecast)
    const {fetchingForecast} = useActions()

    const [temp, setTemp] = useState('℃')
    const [inputValue, setInputValue] = useState('')
    const [currentDay, setCurrentDay] = useState('')

    useEffect(() => {
        fetchingWeather()
        fetchingForecast()

        days.filter((item,index): void => {
            if(index === new Date().getDay()){
                setCurrentDay(item)
            }
        })

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
        <div className="weather-error">
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
                        <div key={index} className="weather-current-container">

                            <div className="weather-info-header">
                                <p className="weather-city">{weather.name}, {weather.sys.country}</p>
                                <p className="weather-day">{currentDay}</p>
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
                                    <p>Sunrise: {new Date((weather.sys.sunrise + weather.timezone) * 1000).getUTCHours() + ':' 
                                                + (new Date((weather.sys.sunrise + weather.timezone) * 1000).getMinutes() < 10 ?
                                                   '0' + new Date((weather.sys.sunrise + weather.timezone) * 1000).getMinutes():
                                                    new Date((weather.sys.sunrise + weather.timezone) * 1000).getMinutes())} am</p>
                                    {temp === '℃' ?
                                                    <p className="weather-temp">{Math.floor(weather.main.temp - 273.15)}℃</p>
                                                :
                                                    <p className="weather-temp">{Math.floor(((weather.main.temp - 273.15) * (9/5)) + 32)}℉</p>
                                    }
                                    <p>Sunset: {new Date((weather.sys.sunset + weather.timezone) * 1000).getUTCHours() + ':' 
                                                + (new Date((weather.sys.sunset + weather.timezone) * 1000).getMinutes() < 10 ? 
                                                    '0' + new Date((weather.sys.sunset + weather.timezone) * 1000).getMinutes(): 
                                                    new Date((weather.sys.sunset + weather.timezone) * 1000).getMinutes())} pm</p>
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

            <div className="forecast">
                    {[...forecastWeather].map(forecast =>
                        <div className="forecast-container" key={forecast.city.id}>

                            <div className="forecast-item-container">
                                {forecast.list.slice(0,7).map((item: any) => 
                                        <div className="forecast-item" key={item.dt}>
                                            <p>{new Date(item.dt * 1000).getHours() + ':' 
                                                    + (new Date(item.dt * 1000).getMinutes() < 10 ?
                                                    '0' + new Date(item.dt * 1000).getMinutes():
                                                        new Date(item.dt * 1000).getMinutes())}
                                            </p>
                                            <p className="weather-desc__header">{item.weather[0].main}</p>
                                            <img className="weather-desc__image"alt='clouds' src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
                                            <p className="weather-desc">{item.weather[0].description}</p>
                                            <p><span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                        <span>{Math.floor(item.main.temp - 273.15)}℃</span>
                                                    :
                                                        <span>{Math.floor(((item.main.temp - 273.15) * (9/5)) + 32)}℉</span>
                                            }</span>
                                            </p>
                                        </div>
                                )}
                            </div>
                            
                            <div className="forecast-days-container">
                                {forecast.list.filter((list: any) => forecast.list.indexOf(list) % 8 === 0).map((list: any) => 
                                    <div className="forecast-item forecast-days" key={list.dt}>
                                        <p>{days[new Date(list.dt_txt).getDay()]}</p>
                                        <p className="weather-desc__header">{list.weather[0].main}</p>
                                        <img className="weather-desc__image"alt='clouds' src={`http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}></img>
                                        <p className="weather-desc">{list.weather[0].description}</p>
                                        <p><span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                        <span>{Math.floor(list.main.temp_max - 273.15)}℃</span>
                                                    :
                                                        <span>{Math.floor(((list.main.temp_max - 273.15) * (9/5)) + 32)}℉</span>
                                            }</span> /
                                            <span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                        <span>{Math.floor(list.main.temp_min - 273.15)}℃</span>
                                                    :
                                                        <span>{Math.floor(((list.main.temp_min - 273.15) * (9/5)) + 32)}℉</span>
                                            }</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                           
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Weather