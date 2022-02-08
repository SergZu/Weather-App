import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
    icon: 'CLEAR_DAY',
    color: '#777',
    size: 64,
    animate: true
  };

const WeatherIcon = ({type, currentTime, offset}) => {
    let wicon;
    let date = new Date(currentTime + offset).getUTCHours();
    const isNight = date < 6 || date > 20;  
    switch(type) {
        case 'Clear' :
            wicon = isNight ? 'CLEAR_NIGHT' : 'CLEAR_DAY';
            break;
        case 'Clouds' :
            wicon = isNight ? 'PARTLY_CLOUDY_NIGHT' : 'PARTLY_CLOUDY_DAY';
            break;
        case 'Mist' :
        case 'Fog' :
        case 'Smoke' : 
            wicon = 'FOG'
            break;
        case 'Snow' :
            wicon = 'SNOW';
            break;
        case 'Drizzle' :
        case 'Thunderstorm' :
        case 'Rain' :
            wicon = 'RAIN';
            break;
        default : wicon = 'CLOUDY'
    }
    return (
        <>
           <ReactAnimatedWeather
            icon={wicon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
            /> 
        </>
    )
}

export default WeatherIcon
