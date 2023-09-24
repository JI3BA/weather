import {CityType, ListType} from "./AdditionalForecastTypes";

export interface IForecast {
    cod: string,
    message: number,
    cnt: number,
    list: ListType[],
    city: CityType
}