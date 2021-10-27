import React from 'react'

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

const Weather = () => {
    return (
        <div>
            <h2>Weather is great</h2>
        </div>
    )
}

export default Weather
