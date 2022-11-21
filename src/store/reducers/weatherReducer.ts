import { WeatherActionTypes, weatherState, TypesAction, weatherForecast, TypesActionForecast, WeatherForecastActionTypes } from '../../types/weather'

const initialState: weatherState = {
    weathers: [],
    loading: false,
    error: null,
    city: 'Minsk'
}

const initialForecast: weatherForecast = {
    forecastWeather: [],
    forecastLoading: false,
    forecastError: null,
    forecastCity: 'Minsk'
}

export const weatherReducer = (state = initialState, action: TypesAction): weatherState => {
    switch(action.type){
        case WeatherActionTypes.FETCH_WEATHER:
            return {loading: true, error: null, weathers: [], city: 'Minsk'}
        case WeatherActionTypes.FETCH_WEATHER_SUCCESS:
            return {...state, loading: false, error: null, weathers: [action.payload]}
        case WeatherActionTypes.FETCH_WEATHER_ERROR:
            return {...state, loading: false, error: action.payload, weathers: []}
        case WeatherActionTypes.FETCH_WEATHER_CITY:
            return {...state, city: action.payload}
        default:
            return state
    }
        
}

export const forecastReducer = (state = initialForecast, action: TypesActionForecast): weatherForecast => {
    switch(action.type){
        case WeatherForecastActionTypes.FETCH_FORECAST:
            return {forecastLoading: true, forecastError: null, forecastWeather: [], forecastCity: 'Minsk'}
        case WeatherForecastActionTypes.FETCH_FORECAST_SUCCESS:
            return {...state, forecastLoading: false, forecastError: null, forecastWeather: [action.payload]}
        case WeatherForecastActionTypes.FETCH_FORECAST_ERROR:
            return {...state, forecastLoading: false, forecastError: action.payload, forecastWeather: []}
        case WeatherForecastActionTypes.FETCH_FORECAST_CITY:
            return {...state, forecastCity: action.payload}
        default:
            return state
    }
        
}
