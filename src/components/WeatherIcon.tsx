import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import { convertIconType } from '../utils/convertIconType';
import classes from './WeatherIcon.module.css';

const defaults = {
    icon: 'CLEAR_DAY',
    color: '#aaa',
    size: 64,
    animate: true
  };

export interface weatherIcon {
    type : string;
    isNight : boolean;
}

type weatherIconType =  'CLEAR_NIGHT' | 
                        'CLEAR_DAY' | 
                        'PARTLY_CLOUDY_NIGHT' | 
                        'PARTLY_CLOUDY_DAY' | 
                        'FOG' | 
                        'SNOW' | 
                        'RAIN' | 
                        'CLOUDY';

const WeatherIcon = ({type, isNight} : weatherIcon) => {

    let wicon : weatherIconType = convertIconType(type, isNight) as weatherIconType;
    
    return (
        <div className={classes['icon-container']}>
           <ReactAnimatedWeather
                                icon={wicon}
                                color={defaults.color}
                                size={defaults.size}
                                animate={defaults.animate}
            /> 
        </div>
    )
}

export default WeatherIcon
