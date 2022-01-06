import React from 'react'
import { months } from '../constants'
import computeDirection from '../utils/computeDirection'
import { WeatherApiResponse } from './App'
import classes from './WeatherDetails.module.css'

export interface WeatherDetailsProps {
    weatherData : WeatherApiResponse
}

const WeatherDetails = ({weatherData} : WeatherDetailsProps) => {
    const targetDate = new Date(weatherData.list[0].dt);
    const targetDayData = weatherData.list[0];
    return (
        <div className={classes.weatherDetails}>
            <h3>{weatherData.city.name}</h3>
            <ul>
                <li>{targetDate.getDate()}&nbsp;{months[targetDate.getMonth()]}</li>
                <li>Weather : {targetDayData.weather.description}</li>
                <li>{targetDayData.main.temp_min}&deg; - {targetDayData.main.temp_max}&deg;</li>
                <li>Pressure : {targetDayData.main.pressure}mm</li>
                <li>Clouds : {targetDayData.clouds.all}%</li>
                <li>Wind : {computeDirection(targetDayData.wind.deg)} {targetDayData.wind.speed}m/s</li>
            </ul> 
        </div>
    )
}

export default WeatherDetails
