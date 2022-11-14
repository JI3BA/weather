import React, { FC , useEffect , useState } from "react";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import { useActions } from "../../hooks/useActions";
const days: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const day = new Date()
let dayNow: string = ''

days.find((item,index) => {
    if(index == day.getDay()){
        dayNow = item
    }
})


const Weather: FC = () => {
    const {weathers, loading, error} = useTypesSelector(state => state.weather)
    const {fetchingWeather} = useActions()
    const [temp, setTemp] = useState('')
    
    

    useEffect(() => {
        fetchingWeather()
    }, [])
    
    if(error){
        return <h1>{error}</h1>
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <div className="weather">
            <div className="weather-container">
                <div className="weather-header">
                    <input className='weather-input' type="text" placeholder="city"/>
                    <button className="weather-btn btn-cl" onClick={() => setTemp('℃')}>℃</button>
                    <button className="weather-btn btn-fr" onClick={() => setTemp('℉')}>℉</button>
                    <p>{dayNow}</p>
                    {[...weathers].map((weather, index) => 
                        <div key={index}>
                            <p>{weather.name}</p>
                            <p>Speed wind: {weather.wind.speed} m/s</p>
                            <p>Pressure: {weather.main.pressure} kPа</p>
                            <p>{weather.weather[0].main}</p>
                            {temp === '℃' ?
                                            <p>Temperature: {Math.floor(weather.main.temp - 273.15)}℃</p>
                                           :
                                            <p>Temperature: {Math.floor(((weather.main.temp - 273.15) * (9/5)) + 32)}℉</p>
                            }
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Weather