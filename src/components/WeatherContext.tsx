import React, { useContext } from 'react'

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

export interface WeatherContextProps {
    children : React.ReactNode
}

const Context = React.createContext<WeatherApiResponse | null>(null);

export const useWeatherData  = useContext(Context);

const WeatherContext = ({children} : WeatherContextProps) => {

    return (
        <Context.Provider value={null}>
            {children}
        </Context.Provider>
    )
}

export default WeatherContext
