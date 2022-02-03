export const convertUnixToHM = function(time, offset) {
    let tempDate = new Date(time);
    let hours = tempDate.getUTCHours() + Math.round(offset / 3600000);
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    let minutes = tempDate.getUTCMinutes() + Math.round((offset % 3600000) / 60000 );
    console.log(minutes)
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minutes}`
}