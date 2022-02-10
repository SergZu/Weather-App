
export const convertIconType = (type, isNight) => {
    let returnType;
    switch(type) {
        case 'Clear' :
            returnType = isNight ? 'CLEAR_NIGHT' : 'CLEAR_DAY';
            break;
        case 'Clouds' :
            returnType = isNight ? 'PARTLY_CLOUDY_NIGHT' : 'PARTLY_CLOUDY_DAY';
            break;
        case 'Mist' :
        case 'Fog' :
        case 'Smoke' : 
            returnType = 'FOG'
            break;
        case 'Snow' :
            returnType = 'SNOW';
            break;
        case 'Drizzle' :
        case 'Thunderstorm' :
        case 'Rain' :
            returnType = 'RAIN';
            break;
        default : returnType = 'CLOUDY'
    }
    return returnType
}