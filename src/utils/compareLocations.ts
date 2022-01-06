import { Location } from "../components/App"

export const compareLocations = (arr : Location[], locB : Location) : boolean => {
    return arr.some((loc) => (loc.name === locB.name && loc.lat === locB.lat && loc.lon === locB.lon))    
}