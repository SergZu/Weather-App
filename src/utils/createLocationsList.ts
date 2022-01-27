import { WeatherDataObject, Location } from "../components/App"

export const createLocationsList = (weatherDataObj : WeatherDataObject) : Location[] => {
        const list : Location[] = [];
        for (let location in weatherDataObj) {
            const locElement : Location = {
                name : location,
                lat : weatherDataObj[location].lat,
                lon : weatherDataObj[location].lon
            }
            list.push(locElement);
        }
    return list
} 