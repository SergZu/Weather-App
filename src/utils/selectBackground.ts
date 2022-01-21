export  const selectBackground = (weatherType : string) : string => {
    let result = '';
    switch (weatherType) {
        case 'Clear' : 
            result = 'clearSkyBackground';
            break;
        case 'Cloud' : 
            result = 'cloudyBackground';
            break;
        case 'Rain' :
            result = 'rainyBackground';
            break;
        case 'Snow' :
            result = 'snowyBackground';
            break;
        case 'Fog' :
            result = 'foggyBackground';
            break;
        default :
            result = 'defaultBackground'
    }
    return result
}
