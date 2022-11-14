// export interface IMain {
//     temp: number;
//     humidity: number;
//     pressure: number;
// }

// export interface IWind {
//     speed: number;
// }

export interface IWeather {
    weather: Array<{
        main: string,
        description: string
    }>,
    main: {
        temp: number,
        feels_like: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
    }
}