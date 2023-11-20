import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import React from "react";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Weather />
            </React.Fragment>
          }
        />
        <Route
          path="/favorites"
          element={
            <React.Fragment>
              <Favorites />
            </React.Fragment>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

{
  /* {`${import.meta.env.VITE_REACT_API_KEY}`} */
}

{
  /*
Autocomplete search

[
  {
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
      "ID": "IL",
      "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
      "ID": "TA",
      "LocalizedName": "Tel Aviv"
    }
  }
]

Current Conditions
[
  {
    "LocalObservationDateTime": "2023-11-20T13:52:00+02:00",
    "EpochTime": 1700481120,
    "WeatherText": "Mostly cloudy",
    "WeatherIcon": 6,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "IsDayTime": true,
    "Temperature": {
      "Metric": {
        "Value": 20.9,
        "Unit": "C",
        "UnitType": 17
      },
      "Imperial": {
        "Value": 70,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
  }
]

5 Days of Daily Forecasts with metric set to true
{
  "Headline": {
    "EffectiveDate": "2023-11-20T13:00:00+02:00",
    "EffectiveEpochDate": 1700478000,
    "Severity": 7,
    "Text": "Breezy Monday afternoon",
    "Category": "wind",
    "EndDate": "2023-11-20T19:00:00+02:00",
    "EndEpochDate": 1700499600,
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
  },
  "DailyForecasts": [
    {
      "Date": "2023-11-20T07:00:00+02:00",
      "EpochDate": 1700456400,
      "Temperature": {
        "Minimum": {
          "Value": 18.2,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 21.8,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 12,
        "IconPhrase": "Showers",
        "HasPrecipitation": true,
        "PrecipitationType": "Rain",
        "PrecipitationIntensity": "Moderate"
      },
      "Night": {
        "Icon": 39,
        "IconPhrase": "Partly cloudy w/ showers",
        "HasPrecipitation": true,
        "PrecipitationType": "Rain",
        "PrecipitationIntensity": "Light"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-21T07:00:00+02:00",
      "EpochDate": 1700542800,
      "Temperature": {
        "Minimum": {
          "Value": 16.8,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 23.9,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-22T07:00:00+02:00",
      "EpochDate": 1700629200,
      "Temperature": {
        "Minimum": {
          "Value": 18.3,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 26,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 4,
        "IconPhrase": "Intermittent clouds",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-23T07:00:00+02:00",
      "EpochDate": 1700715600,
      "Temperature": {
        "Minimum": {
          "Value": 16.2,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 25.1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 1,
        "IconPhrase": "Sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-24T07:00:00+02:00",
      "EpochDate": 1700802000,
      "Temperature": {
        "Minimum": {
          "Value": 16.1,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 24.4,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
    }
  ]
}
*/
}
