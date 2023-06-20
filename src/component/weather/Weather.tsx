import { useEffect , useState, KeyboardEvent, ChangeEvent } from "react";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import { useActions } from "../../hooks/useActions";
import './Weather.scss'
import {MappedWeatherCurrent} from "../map/MappedWeatherCurrent";
import {MappedForecast} from "../map/MappedForecast";
import {Button} from "../button/Button";

const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export const Weather = () => {
    const { loading, error, city } = useTypesSelector(state => state.weather)
    const {fetchingWeather} = useActions()
    const { forecastLoading, forecastError, forecastCity} = useTypesSelector(state => state.forecast)
    const {fetchingForecast} = useActions()
    const celsius: string = 'C'
    const fahrenheit: string = 'F'

    const [temp, setTemp] = useState(celsius)
    const [inputValue, setInputValue] = useState('')
    const [currentDay, setCurrentDay] = useState('')

    useEffect(() => {
        fetchingWeather(city)
        fetchingForecast(forecastCity)

        days.filter((item,index) => index === new Date().getDay() ? setCurrentDay(item) : null)

    }, [city, forecastCity])   

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === 'Enter'){
            fetchingWeather(inputValue)
            fetchingForecast(inputValue)
            setInputValue('')
        }
    }
    
    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }
    
    if(error || forecastError){
        return (
        <div className="weather__error">
            <input className='weather__input' type="text" placeholder="city" onKeyDown={handleKeyDown} value={inputValue} onChange={onChangeHandle} maxLength={15} />
            <h1>{error}</h1>
        </div>)
    }

    if(loading || forecastLoading){
        return <p className='weather__loader'></p>
    }

    return (
        <div className="weather">
            <div className="weather__container">

                <div className="weather__header" onKeyDown={handleKeyDown}>
                    <input className='weather__input' type="text" placeholder="city" value={inputValue} onChange={onChangeHandle} maxLength={15} />
                    <div className="weather__btns">
                        <Button className="weather__btn weather__btn--cl" onClick={() => setTemp(celsius)}>℃</Button>
                        <Button className="weather__btn weather__btn--fr" onClick={() => setTemp(fahrenheit)}>℉</Button>
                    </div>
                </div>

                <div className="weather-current">
                    <MappedWeatherCurrent currentDay={currentDay} temp={temp}/>
                </div>
            </div>

            <div className="forecast">
                <MappedForecast temp={temp} days={days}/>
            </div>
        </div>
    )
}