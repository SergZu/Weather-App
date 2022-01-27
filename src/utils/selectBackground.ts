
export  const selectBackground = (timezoneOffset : number | null ) : string => {
    if (timezoneOffset === null) return 'defaultBackground';
    const date = new Date;
    const hours = date.getUTCHours() + 
                                        timezoneOffset < 0 ? Math.ceil(timezoneOffset / 3600000) : Math.floor(timezoneOffset / 3600000);
    
    const isDayTime = hours > 6 && hours < 18;
   
    return isDayTime ? 'clearSkyBackground' : 'rainyBackground';
}
