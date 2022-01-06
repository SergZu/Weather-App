import React from 'react'
import CurrentDate from '../UI/CurrentDate/CurrentDate'
import computeDirection from '../utils/computeDirection'
import classes from './WeatherDisplay.module.css'
import WeatherIcon from './WeatherIcon'


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
            <div className={classes.displayInfoBlock}>
                <span className={classes.displayLocation}>{data.location}</span>
                <CurrentDate />                        
            </div>
            <div className={classes.displayWeather}>
                <span className={classes.displayTemp}>{data.temp}&deg;</span>
                <span className={classes.displayWeather}><WeatherIcon type={data.weather}/></span>
                <span className={classes.displayWind}>{`Wind : ${data.wind.speed}m/s ${computeDirection(data.wind.deg)}`}</span> 
            </div>
        </div>
    )
}

export default WeatherDisplay
