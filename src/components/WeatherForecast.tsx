import React, { useMemo } from 'react'
import { WeatherType } from './Weather'

export interface ForecastProps {
    data : WeatherType[]
}

const WeatherForecast = ({data} : ForecastProps) => {
    const dataArr  : WeatherType[] = [...data];
    let layout =  dataArr.map((item) => (<h4 key={item.dt}>{`${new Date(item.dt).getDate()} ${item.main.temp} ${item.weather.description}` }</h4>));
    
    return (
        <div>
            {layout}
        </div>
    )
}

export default WeatherForecast
