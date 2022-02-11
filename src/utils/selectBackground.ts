export interface timePref {
    sunrise : number;
    sunset : number;
    current : number;
}

export  const selectBackground = (options : timePref | null ) : string => {
    if (options === null) return 'defaultBackground';
    
    const isDayTime = options.current > options.sunrise && options.current < options.sunset;
   
    return isDayTime ? 'clearSkyBackground' : 'nightBackground';
}
