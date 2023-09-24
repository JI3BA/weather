import {CloudsType, CoordinatesType} from "./AdditionalWeatherTypes";

type MainType = {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number,
}

type WeatherType = {
    id: number,
    main: string,
    description: string,
    icon: string
}

type WindType = {
    speed: number,
    deg: number,
    gust: number,
}

type RainType = {
    "3h": number
}

type SysType = {
    pod: string
}

export type ListType = {
    dt: number,
    main: MainType,
    weather: WeatherType[],
    clouds: CloudsType,
    wind: WindType,
    visibility: number,
    pop: number,
    rain: RainType,
    sys: SysType,
    dt_txt: string
}

export type CityType = {
    id: number,
    name: string,
    coord: CoordinatesType,
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number,
}