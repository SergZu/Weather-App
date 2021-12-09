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