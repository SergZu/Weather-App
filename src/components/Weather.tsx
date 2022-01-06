import React from 'react'
import WeatherDisplay from './WeatherDisplay'
import WeatherForecast from './WeatherForecast'
import classes from './Weather.module.css'
import { WeatherApiResponse } from './App'



export interface WeatherProps {
    data : WeatherApiResponse;
    location : string
}



const Weather = React.memo(function Weather({location, data} : WeatherProps) {
    const displayData = {
        temp : data.list[0].main.temp,
        weather : data.list[0].weather.main,
        wind : data.list[0].wind,
        location 
    }
    const forecastData = data.list.slice(1); 
    return (
        <div className={classes.weatherBlock}>
           <WeatherDisplay data={displayData} />
            <WeatherForecast data={forecastData} />
        </div>
    )
})

export default Weather
