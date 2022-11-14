export interface weatherState {
    weathers: any[],
    loading: boolean,
    error: null | string,
    // weather?: [{
    //     main: string,
    //     description: string
    // }],
    // main?: {
    //     temp: number,
    //     feels_like: number,
    //     pressure: number,
    //     humidity: number
    // },
    // visibility?: number,
    // wind?: {
    //     speed: number,
    //     deg: number,
    // }
}


export enum WeatherActionTypes {
    FETCH_WEATHER = 'FETCH_WEATHER',
    FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS',
    FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR'
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

export type TypesAction = fetchWeather | fetchSuccessWeather | fetchErrorWeather