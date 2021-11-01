import React from 'react'
import WeatherDisplay, { DisplayProps } from './WeatherDisplay'
import WeatherForecast from './WeatherForecast'

export type WeatherType = {
    dt : number,
    main : {
        temp : number,
        temp_min : number,
        temp_max : number,
        pressure : number 
    },
    weather : {
        main : string,
        description : string
    },
    clouds : {
        all : number
    },
    wind : {
        speed : number,
        deg : number
    }
}

export type WeatherApiResponse = {
    cod : string,
    list : WeatherType[],
    city : {
        name : string
    }
}

export interface WeatherProps {
    data : WeatherApiResponse;
    location : string
}



const Weather = ({location, data} : WeatherProps) => {
    console.log(data, location);
    const displayData = {
        temp : data.list[0].main.temp,
        weather : data.list[0].weather.main,
        wind : data.list[0].wind,
        location 
    }
    const forecastData = data.list.slice(1); 
    return (
        <div>
           <WeatherDisplay data={displayData} />
            <WeatherForecast data={forecastData} />
        </div>
    )
}

export default Weather
