import axios from "axios";
import { setLocationAlias } from "../utils/storageUtils";

export default class WeatherService {
    static async getAllData() {
        const responce = await axios.get("http://localhost:3004/data");
        return responce.data
    }
    static async getDataByCoords({lat, lon}) {
        const responce = await axios.get("http://localhost:3004/Geo");
        setLocationAlias({
            name : responce.data.city.name,
            lon,
            lat
        });
        return responce.data
    }
    static async getDataByName({name}) {
        const responce = await axios.get("http://localhost:3004/Rio");
        return responce.data
    }
}