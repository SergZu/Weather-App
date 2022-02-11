
export const convertUnixToHM = function(time, offset) {
    let tempDate = new Date(time + offset);
    let hours = tempDate.getUTCHours();
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    let minutes = tempDate.getUTCMinutes();
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minutes}`
}