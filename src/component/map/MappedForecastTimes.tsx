import React, {FC} from "react";

type MappedForecastTimesType = {
    forecast: any,
    temp: string,
    celsius: string,
    fahrenheit: string
}

export const MappedForecastTimes: FC<MappedForecastTimesType> = ({forecast,temp, celsius, fahrenheit}) => {
    return (
        <>
            {forecast.list.slice(0,7).map((item: any) =>
                <div className="forecast__item" key={item.dt}>
                    <p className="forecast__title">
                        {new Date(item.dt * 1000).getHours() + ':'
                            + (new Date(item.dt * 1000).getMinutes() < 10 ?
                                '0' + new Date(item.dt * 1000).getMinutes():
                                new Date(item.dt * 1000).getMinutes())}
                    </p>
                    <p className="weather-current__info-main">{item.weather[0].main}</p>
                    <img className="weather-desc__image forecast__image" alt='clouds' src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
                    <p className="weather-current__info-desc forecast__description">{item.weather[0].description}</p>
                    <p><span style={{fontWeight: 600, paddingLeft: 5}}>{temp === celsius ?
                        <span>{Math.floor(item.main.temp - 273.15)}{celsius}</span>
                        :
                        <span>{Math.floor(((item.main.temp - 273.15) * (9/5)) + 32)}{fahrenheit}</span>
                    }</span>
                    </p>
                </div>
            )}
        </>
    )
}