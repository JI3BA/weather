import { combineReducers } from "redux";
import { forecastReducer, weatherReducer } from "./weatherReducer";

export const rootReducer = combineReducers({
    weather: weatherReducer,
    forecast: forecastReducer
})

export type RootState = ReturnType<typeof rootReducer>