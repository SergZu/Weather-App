import React from 'react'
import { WeatherApiResponse } from './Weather'
import classes from './WeatherDetails.module.css'

export interface WeatherDetailsProps {
    weatherData : WeatherApiResponse
}

const WeatherDetails = ({weatherData} : WeatherDetailsProps) => {
    return (
        <div className={classes.weatherDetails}>
            
        </div>
    )
}

export default WeatherDetails
