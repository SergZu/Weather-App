import React from 'react'
import { months } from '../constants';
import classes from './ForecastElement.module.css'


export interface ForecastElementProps {
    date : number;
    tmin : number;
    tmax : number;
    description : string;
}

const ForecastElement = ({date, tmin, tmax, description} : ForecastElementProps) => {
    const targetDate = new Date(date);

    return (
        <div className={classes.forecastElement}>
            <span>{`${targetDate.getDate()} ${months[targetDate.getMonth()]}`}</span>
            <span>min: {tmin}&deg;&emsp;max: {tmax}&deg;</span>
            <span>{description}</span>
        </div>
    )
}

export default ForecastElement
