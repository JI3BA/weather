import React, {FC} from "react";
import {useTypesSelector} from "../../hooks/useTypesSelector";

type MappedWeatherCurrentType = {
    currentDay: string,
    temp: string
}

export const MappedWeatherCurrent: FC<MappedWeatherCurrentType> = ({currentDay, temp}) => {
    const { weathers } = useTypesSelector(state => state.weather)

    return (
        <>
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
        </>
    )
}