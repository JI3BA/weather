import { Dispatch } from "redux";
import axios from "axios";

import { TypesAction, TypesActionForecast } from "../../types/weather";
import { WeatherActionTypes, WeatherForecastActionTypes } from "../../types/weather";

export const fetchingWeather = (city: string = 'Minsk') => {
    const API_KEY: string = '742563dbd33a05f3b419adf49b418ec5'

    return async (dispatch: Dispatch<TypesAction>) => {
        try {
            dispatch({type: WeatherActionTypes.FETCH_WEATHER})
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?exclude=hourly,minutely&q=${city}&appid=${API_KEY}`)
            setTimeout(() => {
                dispatch({type: WeatherActionTypes.FETCH_WEATHER_SUCCESS, payload: response.data})
            }, 500)
        } catch(e) {
            dispatch({
                type: WeatherActionTypes.FETCH_WEATHER_ERROR,
                payload: 'Error, city don`t found!'
            })
        }

    }
}

export const fetchingForecast = (city: string = 'Minsk') => {
    const API_KEY: string = '742563dbd33a05f3b419adf49b418ec5'

    return async (dispatch: Dispatch<TypesActionForecast>) => {
        try {
            dispatch({type: WeatherForecastActionTypes.FETCH_FORECAST})
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
            setTimeout(() => {
                dispatch({type: WeatherForecastActionTypes.FETCH_FORECAST_SUCCESS, payload: response.data})
            }, 500)
        } catch(e) {
            dispatch({
                type: WeatherForecastActionTypes.FETCH_FORECAST_ERROR,
                payload: 'Error, city don`t found!'
            })
        }

    }
}