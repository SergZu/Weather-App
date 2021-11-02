import React from 'react'
import CurrentDate from '../UI/CurrentDate/CurrentDate'
import computeDirection from '../utils/computeDirection'
import classes from './WeatherDisplay.module.css'


export interface DisplayProps {
    data : {
        temp : number;
        weather : string;
        wind : {
            speed : number;
            deg : number;
        }
        location : string;
    }
}

const WeatherDisplay = ({data} : DisplayProps) => {

    return (
        <div className={classes.display}>
            <span className={classes.displayTemp}>{data.temp}&deg;</span>
            <div className={classes.displayInfoBlock}>
                <span className={classes.displayLocation}>{data.location}</span>
                <CurrentDate />
                <span className={classes.displayWind}>{`Wind : ${data.wind.speed}m/s ${computeDirection(data.wind.deg)}`}</span>             
            </div>
            <span className={classes.displayWeather}>{data.weather}</span>
        </div>
    )
}

export default WeatherDisplay
