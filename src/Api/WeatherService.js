import axios from "axios";
import { OWMadapter } from "../utils/OWMDataAdapter";

const WEATHER_URL = "http://api.openweathermap.org/data/2.5/onecall?";
const GEOREVERSE_API_URL = "http://api.openweathermap.org/geo/1.0/reverse?";
const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct?"

const getRequestConfig = {
    timeout : 10000,
    timeoutErrorMessage : 'Timeout of 10s exceeded'
}

export default class WeatherService {
    static async getAllData(data) {
        const responses = data.map((item) => {
            return axios.get
                (`${WEATHER_URL}lat=${item.lat}&lon=${item.lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
                    getRequestConfig)
        });
        const responseResults = await Promise.all(responses);
        const result = {};
        for (let i = 0; i < responseResults.length; i++) {
            const { name } = data[i];
            let res = responseResults[i].status !== 200 ?
                                                            {} :
                                                            responseResults[i].data;
            const weatherData = OWMadapter(res, name);                                                
            
            result[ name ] = weatherData;
            
        }

        return result
    }

    static async getLocationData({name, lat, lon}) {
        const response = await axios.get(`${WEATHER_URL}lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
            getRequestConfig);
        if (response.status !== 200) return null

        const weatherData = OWMadapter(response.data, name);
        return weatherData
    }

    static async getDataByName({name}) {
        const response = await axios.get(`${GEOCODING_API_URL}q=${ encodeURIComponent(name) }&limit=10&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
            getRequestConfig);
        return response.status !== 200 ?  null : response.data
    }

    static async getDataByCoords({lat, lon}) {
        const response = await axios.get(`${GEOREVERSE_API_URL}lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
            getRequestConfig);
        return response.status !== 200 ?  null : response.data
    }
}