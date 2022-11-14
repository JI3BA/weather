import { WeatherActionTypes, weatherState, TypesAction } from '../../types/weather'

const initialState: weatherState = {
    weathers: [],
    loading: false,
    error: null,
    // weather: [{main: '', description: ''}],
    // main: {
    //     temp: 0,
    //     feels_like: 0,
    //     pressure: 0,
    //     humidity: 0
    // },
    // visibility: 0,
    // wind: {
    //     speed: 0,
    //     deg: 0,
    // }
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