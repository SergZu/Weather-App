export type timePref = {
    sunrise : number;
    sunset : number
}

export  const selectBackground = (options : timePref | null ) : string => {
    if (options === null) return 'defaultBackground';
    const date = Date.now();
    
    const isDayTime = date > options.sunrise && date < options.sunset;
   
    return isDayTime ? 'clearSkyBackground' : 'nightBackground';
}
