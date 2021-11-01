import React from 'react'
import CurrentDate from '../UI/CurrentDate/CurrentDate'
import computeDirection from '../utils/computeDirection'


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
        <div>
            <span>{data.temp}</span>
            <div>
                <span>{data.location}</span>
                <CurrentDate />
                <span>{data.weather}</span>
                <span>{`${data.wind.speed} ${computeDirection(data.wind.deg)}`}</span>
            </div>
        </div>
    )
}

export default WeatherDisplay
