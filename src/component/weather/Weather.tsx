import React, { FC , useEffect , useState } from "react";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import { useActions } from "../../hooks/useActions";
import './Weather.scss'

const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const Weather: FC = () => {
    const {weathers, loading, error, city} = useTypesSelector(state => state.weather)
    const {fetchingWeather} = useActions()
    const {forecastWeather, forecastLoading, forecastError, forecastCity} = useTypesSelector(state => state.forecast)
    const {fetchingForecast} = useActions()

    const [temp, setTemp] = useState('℃')
    const [inputValue, setInputValue] = useState('')
    const [currentDay, setCurrentDay] = useState('')

    useEffect(() => {
        fetchingWeather(city)
        fetchingForecast(forecastCity)

        days.filter((item,index) => index === new Date().getDay() ? setCurrentDay(item) : null)

    }, [city, forecastCity])   

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === 'Enter'){
            fetchingWeather(inputValue)
            fetchingForecast(inputValue)
            setInputValue('')
        }
    }
    
    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }
    
    if(error || forecastError){
        return (
        <div className="weather__error">
            <input className='weather__input' type="text" placeholder="city" onKeyDown={handleKeyDown} value={inputValue} onChange={onChangeHandle} maxLength={15} />
            <h1>{error}</h1>
        </div>)
    }

    if(loading || forecastLoading){
        return <p className='weather__loader'></p>
    }

    return (
        <div className="weather">
            <div className="weather__container">

                <div className="weather__header" onKeyDown={handleKeyDown}>
                    <input className='weather__input' type="text" placeholder="city" value={inputValue} onChange={onChangeHandle} maxLength={15} />
                    <div className="weather__btns">
                        <button className="weather__btn weather__btn--cl" onClick={() => setTemp('℃')}>℃</button>
                        <button className="weather__btn weather__btn--fr" onClick={() => setTemp('℉')}>℉</button>
                    </div>
                </div>

                <div className="weather-current">
                    {[...weathers].map((weather, index) => 
                        <div key={index} className="weather-current__container">

                            <div className="weather-current__header">
                                <p className="weather-current__info">{weather.name}, {weather.sys.country}</p>
                                <p className="weather-current__info">{currentDay}</p>
                            </div>

                            <div className="weather-current__main">

                                <div className="weather-current__clouds">
                                    <div className="weather-current__description">
                                        <p className="weather-current__info-main">{weather.weather[0].main}</p>
                                        <p className="weather-current__info-desc">{weather.weather[0].description}</p>
                                    </div>
                                    <img className="weather-current__image" alt='clouds' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                                </div>

                                <div className="weather-current__temp-sunrise">
                                    <p>Sunrise: {new Date((weather.sys.sunrise + weather.timezone) * 1000).getUTCHours() + ':' 
                                                + (new Date((weather.sys.sunrise + weather.timezone) * 1000).getMinutes() < 10 ?
                                                   '0' + new Date((weather.sys.sunrise + weather.timezone) * 1000).getMinutes():
                                                    new Date((weather.sys.sunrise + weather.timezone) * 1000).getMinutes())} am</p>
                                    {temp === '℃' ?
                                                    <p className="weather-current__temp">{Math.floor(weather.main.temp - 273.15)}℃</p>
                                                :
                                                    <p className="weather-current__temp">{Math.floor(((weather.main.temp - 273.15) * (9/5)) + 32)}℉</p>
                                    }
                                    <p>Sunset: {new Date((weather.sys.sunset + weather.timezone) * 1000).getUTCHours() + ':' 
                                                + (new Date((weather.sys.sunset + weather.timezone) * 1000).getMinutes() < 10 ? 
                                                    '0' + new Date((weather.sys.sunset + weather.timezone) * 1000).getMinutes(): 
                                                    new Date((weather.sys.sunset + weather.timezone) * 1000).getMinutes())} pm</p>
                                </div>

                            </div>

                            <div className="weather-current__footer">
                                <div className="weather-current__temp-maxmin">
                                    <p className="weather-current-footer__temp">Temp max:<span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                <span>{Math.floor(weather.main.temp_max - 273.15)}℃</span>
                                                :
                                                <span>{Math.floor(((weather.main.temp_max - 273.15) * (9/5)) + 32)}℉</span>
                                    }</span></p>
                                    <p className="weather-current-footer__temp">Temp min:<span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                <span>{Math.floor(weather.main.temp_min - 273.15)}℃</span>
                                                :
                                                <span>{Math.floor(((weather.main.temp_min - 273.15) * (9/5)) + 32)}℉</span>
                                    }</span></p>
                                </div>
                                <div className="weather-current__enviroment">
                                    <p className="weather-current__speed">Speed wind: <span style={{fontWeight: 600}}>{weather.wind.speed}</span> m/s</p>
                                    <p className="weather-current__pressure">Pressure: <span style={{fontWeight: 600}}>{weather.main.pressure}</span> hPа</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>

            <div className="forecast">
                    {[...forecastWeather].map(forecast =>
                        <div className="forecast__container" key={forecast.city.id}>

                            <div className="forecast__items">
                                {forecast.list.slice(0,7).map((item: any) => 
                                        <div className="forecast__item" key={item.dt}>
                                            <p>{new Date(item.dt * 1000).getHours() + ':' 
                                                    + (new Date(item.dt * 1000).getMinutes() < 10 ?
                                                    '0' + new Date(item.dt * 1000).getMinutes():
                                                        new Date(item.dt * 1000).getMinutes())}
                                            </p>
                                            <p className="weather-current__info-main">{item.weather[0].main}</p>
                                            <img className="weather-desc__image forecast__image"alt='clouds' src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
                                            <p className="weather-current__info-desc forecast__description">{item.weather[0].description}</p>
                                            <p><span style={{fontWeight: 600, paddingLeft: 5}}>{temp === '℃' ?
                                                        <span>{Math.floor(item.main.temp - 273.15)}℃</span>
                                                    :
                                                        <span>{Math.floor(((item.main.temp - 273.15) * (9/5)) + 32)}℉</span>
                                            }</span>
                                            </p>
                                        </div>
                                )}
                            </div>
                            
                            <div className="forecast__days">
                                {forecast.list.filter((list: any) => forecast.list.indexOf(list) % 8 === 0).map((list: any) => 
                                    <div className="forecast__item forecast__day" key={list.dt}>
                                        <p>{days[new Date(list.dt_txt).getDay()]}</p>
                                        <p className="weather-current__info-main">{list.weather[0].main}</p>
                                        <img className="weather-current__image forecast__image"alt='clouds' src={`http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}></img>
                                        <p className="weather-current__info-desc forecast__description">{list.weather[0].description}</p>
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