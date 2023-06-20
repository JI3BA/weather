import React, {FC} from "react";

type FilteredForecastDaysType = {
    forecast: any,
    temp: string,
    days: string[]
}

export const FilteredForecastDays: FC<FilteredForecastDaysType> = ({forecast,temp,days}) => {
    return (
        <>
            {forecast.list.filter((list: any) => forecast.list.indexOf(list) % 8 === 0).map((list: any) =>
                <div className="forecast__item forecast__day" key={list.dt}>
                    <p className="forecast__title">{days[new Date(list.dt_txt).getDay()]}</p>
                    <p className="weather-current__info-main">{list.weather[0].main}</p>
                    <img className="weather-current__image forecast__image" alt='clouds' src={`http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}></img>
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
        </>
    )
}