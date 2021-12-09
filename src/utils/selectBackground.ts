export  const selectBackground = (weatherType : string, isMars : boolean) : string => {
    if (isMars) return 'marsBackground'
    let result = '';
    switch (weatherType) {
        case 'clear' : 
            result = 'clearSkyBackground';
            break;
        case 'cloud' : 
            result = 'cloudyBackground';
            break;
        case 'rain' :
            result = 'rainyBackground';
            break;
        case 'snow' :
            result = 'snowyBackground';
            break;
        case 'fog' :
            result = 'foggyBackground';
            break;
        default :
            result = 'defaultBackground'
    }
    return result
}
