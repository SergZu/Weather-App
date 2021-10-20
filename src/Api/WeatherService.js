import axios from "axios";

export default class WeatherService {
    static async getAllData() {
        const responce = await axios.get("http://localhost:3004/data");
        return responce.data
    }
}