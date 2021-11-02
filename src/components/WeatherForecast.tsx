import React, { useMemo } from 'react'
import ForecastElement from './ForecastElement';
import { WeatherType } from './Weather'
import classes from './WeatherForecast.module.css'

export interface ForecastProps {
    data : WeatherType[]
}

const WeatherForecast = ({data} : ForecastProps) => {
    const dataArr  : WeatherType[] = [...data];
    let layout =  dataArr.map((item) => 
        (<ForecastElement key={item.dt} date={item.dt} tmin={item.main.temp_min} tmax={item.main.temp_max} description={item.weather.description} />)
        );
    
    return (
        <div className={classes.forecast}>
            {layout}
        </div>
    )
}

export default WeatherForecast
