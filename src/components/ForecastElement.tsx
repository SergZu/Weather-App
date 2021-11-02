import React from 'react'
import { months } from '../UI/CurrentDate/CurrentDate';
import classes from './ForecastElement.module.css'


export interface ForecastElementProps {
    date : number;
    tmin : number;
    tmax : number;
    description : string;
}

const ForecastElement = ({date, tmin, tmax, description} : ForecastElementProps) => {
    const targetDate = new Date(date);
    console.log(`${targetDate.getDate()} ${targetDate.getMonth()} ${targetDate.getFullYear()} ${targetDate.getHours()}`)

    return (
        <div className={classes.forecastElement}>
            <span>{`${targetDate.getDate()} ${months[targetDate.getMonth()]}`}</span>
            <span>{tmin}&deg; - {tmax}&deg;</span>
            <span>{description}</span>
        </div>
    )
}

export default ForecastElement
