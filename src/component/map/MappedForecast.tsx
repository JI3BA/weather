import React, {FC} from "react";
import {useTypesSelector} from "../../hooks/useTypesSelector";
import {MappedForecastTimes} from "./MappedForecastTimes";
import {FilteredForecastDays} from "../filter/FilteredForecastDays";
import {IForecast} from "../../types/IForecast";

type MappedForecastType = {
    temp: string,
    days: string[],
    celsius: string,
    fahrenheit: string
}

export const MappedForecast: FC<MappedForecastType> = ({temp, days, celsius, fahrenheit}) => {
    const { forecastWeather } = useTypesSelector(state => state.forecast)

    return (
        <>
            {[...forecastWeather].map((forecast: IForecast) =>
                <div className="forecast__container" key={forecast.city.id}>

                    <div className="forecast__items">
                        <MappedForecastTimes celsius={celsius} fahrenheit={fahrenheit} forecast={forecast} temp={temp}/>
                    </div>

                    <div className="forecast__days">
                        <FilteredForecastDays celsius={celsius} fahrenheit={fahrenheit} forecast={forecast} temp={temp} days={days}/>
                    </div>
                </div>
            )}
        </>
    )
}