import React, {FC} from "react";
import {useTypesSelector} from "../../hooks/useTypesSelector";
import {MappedForecastTimes} from "./MappedForecastTimes";
import {FilteredForecastDays} from "../filter/FilteredForecastDays";

type MappedForecastType = {
    temp: string,
    days: string[]
}

export const MappedForecast: FC<MappedForecastType> = ({temp, days}) => {
    const { forecastWeather } = useTypesSelector(state => state.forecast)

    return (
        <>
            {[...forecastWeather].map(forecast =>
                <div className="forecast__container" key={forecast.city.id}>

                    <div className="forecast__items">
                        <MappedForecastTimes forecast={forecast} temp={temp}/>
                    </div>

                    <div className="forecast__days">
                        <FilteredForecastDays forecast={forecast} temp={temp} days={days}/>
                    </div>
                </div>
            )}
        </>
    )
}