import React from 'react'
import CurrentDate from '../UI/CurrentDate/CurrentDate'
import computeDirection from '../utils/computeDirection'
import { convertUnixToHM } from '../utils/convertUnixTimeToHHMM'
import classes from './WeatherDisplay.module.css'
import WeatherIcon from './WeatherIcon'


export interface DisplayProps {
    data : {
        temp : number;
        weather : string;
        wind : {
            speed : number;
            deg : number;
        },
        uvi : number;
        pressure : number;
        sunset : number;
        sunrise : number;
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
                <span className={classes.displayAtm}>{`Atm - ${data.pressure} hPa`}</span>
                <span className={classes.displayUVI}>{`UV Index - ${data.uvi}`}</span>
                <div className={classes.suntimes}>
                    <span>{`Sunrise - ${convertUnixToHM(data.sunrise)}`}</span>
                    <span>{`Sunset - ${convertUnixToHM(data.sunset)}`}</span>
                </div>
            </div>
        </div>
    )
}

export default WeatherDisplay
