import React from 'react'
import { months } from '../constants';
import computeDirection from '../utils/computeDirection';
import classes from './ForecastElement.module.css'


export interface ForecastElementProps {
    date : number;
    tmin : number;
    tmax : number;
    description : string;
    wind : {
        speed: number;
        deg: number;
    }
}

const ForecastElement = ({date, tmin, tmax, description, wind} : ForecastElementProps) => {
    const targetDate = new Date(date);

    return (
        <div className={classes.forecastElement}>
            <span>{`${targetDate.getDate()} ${months[targetDate.getMonth()]}`}</span>
            <span>min: {tmin}&deg;&emsp;max: {tmax}&deg;</span>
            <span>{description}</span>
            <span>{`${wind.speed}m/s ${computeDirection(wind.deg)}`}</span>
        </div>
    )
}

export default ForecastElement
