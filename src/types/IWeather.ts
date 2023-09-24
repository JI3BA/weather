import {CloudsType, CoordinatesType, MainType, SysType, WeatherType, WindType} from "./AdditionalWeatherTypes";


export interface IWeather {
    coord: CoordinatesType,
    weather: WeatherType[],
    base: string,
    main: MainType,
    visibility: number,
    wind: WindType,
    clouds: CloudsType,
    dt: string,
    sys: SysType,
    timezone: number,
    id: number,
    name: string,
    cod: number
}