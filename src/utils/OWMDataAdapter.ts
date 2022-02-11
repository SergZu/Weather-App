import { WeatherApiResponse, WeatherType } from "../components/App"

export type dailyWeatherData = {
    
        "dt": number,
        "sunrise": number,
        "sunset": number,
        "moonrise": number,
        "moonset": number,
        "moon_phase": number,
        "temp": {
          "day": number,
          "min": number,
          "max": number,
          "night": number,
          "eve": number,
          "morn": number,
        },
        "feels_like": {
          "day": number,
          "night": number,
          "eve": number,
          "morn": number,
        },
        "pressure": number,
        "humidity": number,
        "dew_point": number,
        "wind_speed": number,
        "wind_deg": number,
        "wind_gust": number,
        "weather": [
          {
            "id": number,
            "main": string,
            "description": string,
            "icon": string,
          }
        ],
        "clouds": number,
        "pop": number,
        "uvi": number
}

export type OWMdata = {
  "lat": number,
  "lon": number,
  "timezone": string,
  "timezone_offset": number,
  "current": {
    "dt": number,
    "sunrise": number,
    "sunset": number,
    "temp": number,
    "feels_like": number,
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "uvi": number,
    "clouds": number,
    "visibility": number,
    "wind_speed": number,
    "wind_deg": number,
    "wind_gust": number,
    "weather": [
        {
        "id": number,
        "main": string,
        "description": string,
        "icon": string,
        }
    ],
    }
    "daily": dailyWeatherData[]         
}

const emptyResponce = {
    cod : "Data unavailable",
    list : null,
    city : {
        name : ""
    }
}

const daysDataLimit = 5;

export const OWMadapter = function(responceData : OWMdata, city : string) : WeatherApiResponse | typeof emptyResponce {
    
    if (!Object.keys(responceData).length) {
        emptyResponce.city.name = city;
        return emptyResponce
    }

    const weatherDataArray : WeatherType[] = [
        {
            dt : responceData.current.dt * 1000,
            sunrise : responceData.current.sunrise * 1000,
            sunset : responceData.current.sunset * 1000,
            main : {
                temp : Math.round(responceData.current.temp) ,
                temp_min : Math.round(responceData.current.temp),
                temp_max : Math.round(responceData.current.temp),
                pressure : Math.round(responceData.current.pressure)
            },
            weather : {
                main : responceData.current.weather[0].main,
                description : responceData.current.weather[0].description
            },
            clouds : {
                all : responceData.current.clouds
            },
            wind : {
                speed : Math.round(responceData.current.wind_speed),
                deg : Math.round(responceData.current.wind_deg)
            },
            uvi : responceData.current.uvi
        }
    ]

    for (let i = 1; i < daysDataLimit; i++) {

        const day = {
            dt : responceData.daily[i].dt * 1000,
            sunrise : responceData.daily[i].sunrise * 1000,
            sunset : responceData.daily[i].sunset * 1000,
            main : {
                temp : Math.round(responceData.daily[i].temp.day),
                temp_min : Math.round(responceData.daily[i].temp.min),
                temp_max : Math.round(responceData.daily[i].temp.max),
                pressure : Math.round( responceData.daily[i].pressure )
            },
            weather : {
                main : responceData.daily[i].weather[0].main,
                description : responceData.daily[i].weather[0].description
            },
            clouds : {
                all : responceData.daily[i].clouds
            },
            wind : {
                speed : Math.round(responceData.daily[i].wind_speed),
                deg : Math.round(responceData.daily[i].wind_deg)
            },
            uvi : responceData.daily[i].uvi
        }

        weatherDataArray.push(day);
    }

    const result : WeatherApiResponse = {
        cod : "OK",
        list : weatherDataArray,    
        lat : responceData.lat,
        lon : responceData.lon,
        time_offset : responceData.timezone_offset * 1000,
        city : {
            name : city
        }

    }
    return result
}