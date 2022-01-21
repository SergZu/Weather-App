import axios from "axios";
import { OWMadapter } from "../utils/OWMDataAdapter";

const WEATHER_URL = "http://api.openweathermap.org/data/2.5/onecall?";


export default class WeatherService {
    static async getAllData(data) {
        const responces = data.map((item) => {
            return axios.get
                (`${WEATHER_URL}lat=${item.lat}&lon=${item.lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`)
        });
        const responceResults = await Promise.all(responces);
        const result = {};
        for (let i = 0; i < responceResults.length; i++) {
            const { name } = data[i];
            let res = responceResults[i].status !== 200 ?
                                                            {} :
                                                            responceResults[i].data;
            const weatherData = OWMadapter(res, name);                                                
            
            result[ name ] = weatherData;
            
        }

        return result
    }
    static async getDataByName({name}) {
        const Rio = {
            "cod" : "200",
            "list" : [
                {
                    "dt" : 1632568823170,
                    "main" : {
                        "temp" : 32,
                        "temp_min" : 98,
                        "temp_max" : 103,
                        "pressure" : 702
                    },
                    "weather" : {
                        "main" : "rain",
                        "description" : "rain"
                    },
                    "clouds" : {
                        "all" : 1
                    },
                    "wind" : {
                        "speed" : 4,
                        "deg" : 102
                    }
                },
                {
                    "dt" : 1632655823170,
                    "main" : {
                        "temp" : 103,
                        "temp_min" : 96,
                        "temp_max" : 107,
                        "pressure" : 720
                    },
                    "weather" : {
                        "main" : "clear",
                        "description" : "clear sky"
                    },
                    "clouds" : {
                        "all" : 1
                    },
                    "wind" : {
                        "speed" : 2,
                        "deg" : 334
                    }
                },
                {
                    "dt" : 1632742823170,
                    "main" : {
                        "temp" : 113,
                        "temp_min" : 102,
                        "temp_max" : 115,
                        "pressure" : 687
                    },
                    "weather" : {
                        "main" : "clear",
                        "description" : "clear sky"
                    },
                    "clouds" : {
                        "all" : 7
                    },
                    "wind" : {
                        "speed" : 12,
                        "deg" : 23
                    }
                },
                {
                    "dt" : 1632829823170,
                    "main" : {
                        "temp" : 140,
                        "temp_min" : 134,
                        "temp_max" : 147,
                        "pressure" : 697
                    },
                    "weather" : {
                        "main" : "rain",
                        "description" : "rainy"
                    },
                    "clouds" : {
                        "all" : 0
                    },
                    "wind" : {
                        "speed" : 1,
                        "deg" : 2
                    }
                },
                {
                    "dt" : 1632916823170,
                    "main" : {
                        "temp" : 133,
                        "temp_min" : 130,
                        "temp_max" : 137,
                        "pressure" : 710
                    },
                    "weather" : {
                        "main" : "clear",
                        "description" : "clear sky"
                    },
                    "clouds" : {
                        "all" : 9
                    },
                    "wind" : {
                        "speed" : 19,
                        "deg" : 142
                    }
                }
            ],
            "city" : {
                "name" : "Rio"
            }
        
    }
    const MockCity = {
        "cod" : "200",
        "list" : [
            {
                "dt" : 1632568823170,
                "main" : {
                    "temp" : 21,
                    "temp_min" : 98,
                    "temp_max" : 103,
                    "pressure" : 702
                },
                "weather" : {
                    "main" : "rain",
                    "description" : "rain"
                },
                "clouds" : {
                    "all" : 1
                },
                "wind" : {
                    "speed" : 4,
                    "deg" : 102
                }
            },
            {
                "dt" : 1632655823170,
                "main" : {
                    "temp" : 103,
                    "temp_min" : 96,
                    "temp_max" : 107,
                    "pressure" : 720
                },
                "weather" : {
                    "main" : "clear",
                    "description" : "clear sky"
                },
                "clouds" : {
                    "all" : 1
                },
                "wind" : {
                    "speed" : 2,
                    "deg" : 334
                }
            },
            {
                "dt" : 1632742823170,
                "main" : {
                    "temp" : 113,
                    "temp_min" : 102,
                    "temp_max" : 115,
                    "pressure" : 687
                },
                "weather" : {
                    "main" : "clear",
                    "description" : "clear sky"
                },
                "clouds" : {
                    "all" : 7
                },
                "wind" : {
                    "speed" : 12,
                    "deg" : 23
                }
            },
            {
                "dt" : 1632829823170,
                "main" : {
                    "temp" : 140,
                    "temp_min" : 134,
                    "temp_max" : 147,
                    "pressure" : 697
                },
                "weather" : {
                    "main" : "rain",
                    "description" : "rainy"
                },
                "clouds" : {
                    "all" : 0
                },
                "wind" : {
                    "speed" : 1,
                    "deg" : 2
                }
            },
            {
                "dt" : 1632916823170,
                "main" : {
                    "temp" : 133,
                    "temp_min" : 130,
                    "temp_max" : 137,
                    "pressure" : 710
                },
                "weather" : {
                    "main" : "clear",
                    "description" : "clear sky"
                },
                "clouds" : {
                    "all" : 9
                },
                "wind" : {
                    "speed" : 19,
                    "deg" : 142
                }
            }
        ],
        "city" : {
            "name" : "MockCity"
        }
    
}
        const mockResponse = [Rio, MockCity ]
        return mockResponse
    }
}