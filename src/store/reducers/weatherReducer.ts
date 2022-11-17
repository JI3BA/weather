import { WeatherActionTypes, weatherState, TypesAction, weatherForecast, TypesActionForecast, WeatherForecastActionTypes } from '../../types/weather'

const initialState: weatherState = {
    weathers: [],
    loading: false,
    error: null,
}

const initialForecast: weatherForecast = {
    forecastWeather: [],
    forecastLoading: false,
    forecastError: null,
}

export const weatherReducer = (state = initialState, action: TypesAction): weatherState => {
    switch(action.type){
        case WeatherActionTypes.FETCH_WEATHER:
            return {loading: true, error: null, weathers: []}
        case WeatherActionTypes.FETCH_WEATHER_SUCCESS:
            return {loading: false, error: null, weathers: [action.payload]}
        case WeatherActionTypes.FETCH_WEATHER_ERROR:
            return {loading: false, error: action.payload, weathers: []}
        default:
            return state
    }
        
}

export const forecastReducer = (state = initialForecast, action: TypesActionForecast): weatherForecast => {
    switch(action.type){
        case WeatherForecastActionTypes.FETCH_FORECAST:
            return {forecastLoading: true, forecastError: null, forecastWeather: []}
        case WeatherForecastActionTypes.FETCH_FORECAST_SUCCESS:
            return {forecastLoading: false, forecastError: null, forecastWeather: [action.payload]}
        case WeatherForecastActionTypes.FETCH_FORECAST_ERROR:
            return {forecastLoading: false, forecastError: action.payload, forecastWeather: []}
        default:
            return state
    }
        
}
