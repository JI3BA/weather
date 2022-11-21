export interface weatherState {
    weathers: any[],
    loading: boolean,
    error: null | string,
    city: string
}

export interface weatherForecast {
    forecastWeather: any[],
    forecastLoading: boolean,
    forecastError: null | string,
    forecastCity: string
}

export enum WeatherForecastActionTypes{
    FETCH_FORECAST = 'FETCH_FORECAST',
    FETCH_FORECAST_SUCCESS = 'FETCH_WEATHER_FETCH_FORECAST_SUCCESS',
    FETCH_FORECAST_ERROR = 'FETCH_FORECAST_ERROR',
    FETCH_FORECAST_CITY = 'FETCH_FORECAST_CITY'
}


export enum WeatherActionTypes {
    FETCH_WEATHER = 'FETCH_WEATHER',
    FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS',
    FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR',
    FETCH_WEATHER_CITY = 'FETCH_WEATHER_CITY'
}

interface fetchForecast {
    type: WeatherForecastActionTypes.FETCH_FORECAST
}

interface fetchSuccessForecast {
    type: WeatherForecastActionTypes.FETCH_FORECAST_SUCCESS,
    payload: any[]
}

interface fetchErrorForecast {
    type: WeatherForecastActionTypes.FETCH_FORECAST_ERROR,
    payload: string
}

interface fetchCityForecast {
    type: WeatherForecastActionTypes.FETCH_FORECAST_CITY,
    payload: string
}

interface fetchWeather {
    type: WeatherActionTypes.FETCH_WEATHER
}

interface fetchSuccessWeather {
    type: WeatherActionTypes.FETCH_WEATHER_SUCCESS,
    payload: any[]
}

interface fetchErrorWeather {
    type: WeatherActionTypes.FETCH_WEATHER_ERROR,
    payload: string
}

interface fetchCityWeather {
    type: WeatherActionTypes.FETCH_WEATHER_CITY,
    payload: string
}

export type TypesAction = fetchWeather | fetchSuccessWeather | fetchErrorWeather | fetchCityWeather

export type TypesActionForecast = fetchForecast | fetchSuccessForecast | fetchErrorForecast | fetchCityForecast