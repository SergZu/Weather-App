export const convertUnixToHM = function(time) {
    let tempDate = new Date(time);
    let hours = tempDate.getHours();
    hours = hours < 10 ? `0${hours}` : `${hours}`;
    let minutes = tempDate.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${minutes}`
}