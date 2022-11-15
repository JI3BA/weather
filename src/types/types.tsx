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