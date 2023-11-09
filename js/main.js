import { weatherCard, tempChange } from "./card.js";

// Grabs the coordinates from the selected option
function weatherCities () {
   let dropdown = document.getElementById("cities");
   let weatherCard = document.getElementById("weatherCard");

   dropdown.addEventListener("change", function () {
      var chosen = dropdown.options[dropdown.selectedIndex];
      var coordinates = chosen.value.split(',');
      //console.log(coordinates[0] + "," + coordinates[1]);
      dropdown.options[0].disabled = true;
      getWeather(coordinates);
   });
}

// Makes the API call for the weather data for the selected city.
// Function to fetch weather data (with an optional mock parameter)
async function fetchWeatherData(coordinates, useMockData = false) {
   if (useMockData) {
     const mockData = {
      dataseries: [
         {
            "product": "civillight",
            "init": "2023110212",
            "dataseries": [
                {
                    "date": 20231103,
                    "weather": "humid",
                    "temp2m": {
                        "max": 27,
                        "min": 27
                    },
                    "wind10m_max": 2
                },
                {
                    "date": 20231103,
                    "weather": "pcloudy",
                    "temp2m": {
                        "max": 28,
                        "min": 27
                    },
                    "wind10m_max": 3
                },
                {
                    "date": 20231104,
                    "weather": "oshower",
                    "temp2m": {
                        "max": 28,
                        "min": 28
                    },
                    "wind10m_max": 2
                },
                {
                    "date": 20231105,
                    "weather": "tstorm",
                    "temp2m": {
                        "max": 28,
                        "min": 28
                    },
                    "wind10m_max": 2
                },
                {
                    "date": 20231106,
                    "weather": "lightrain",
                    "temp2m": {
                        "max": 28,
                        "min": 27
                    },
                    "wind10m_max": 2
                },
                {
                    "date": 20231107,
                    "weather": "clear",
                    "temp2m": {
                        "max": 28,
                        "min": 27
                    },
                    "wind10m_max": 2
                },
                {
                    "date": 20231108,
                    "weather": "fog",
                    "temp2m": {
                        "max": 28,
                        "min": 27
                    },
                    "wind10m_max": 2
                }
            ]
        }
      ]
    };
     return mockData;
   } else {
     // making API call
     const params = {
       "lon": coordinates[1].trim(),
       "lat": coordinates[0].trim(),
       "product": "civillight",
       "output": "json",
     };
     const url = "http://www.7timer.info/bin/api.pl?";
     const response = await fetch(url + new URLSearchParams(params));
     return response.json();
   }
 }
 
 // Populates the dropdown menu
function populateCities () {
   // Loads the lat and long of each cities
   let csvData = `latitude,longitude,city,country
   52.367,4.904,Amsterdam,Netherlands
   39.933,32.859,Ankara,Turkey
   56.134,12.945,Åstorp,Sweden
   37.983,23.727,Athens,Greece
   54.597,-5.930,Belfast,Northern Ireland
   41.387,2.168,Barcelona,Spain
   52.520,13.405,Berlin,Germany
   46.948,7.447,Bern,Switzerland
   43.263,-2.935,Bilbao,Spain
   50.847,4.357,Brussels,Belgium
   47.497,19.040,Bucharest,Romania
   59.329,18.068,Budapest,Hungary
   51.483,-3.168,Cardiff,Wales
   50.937,6.96,Cologne,Germany
   55.676,12.568,Copenhagen,Denmark
   51.898,-8.475,Cork,Ireland
   53.349,-6.260,Dublin,Ireland
   55.953,-3.188,Edinburgh,Scotland
   43.7696,11.255,Florence,Italy
   50.110,8.682,Frankfurt,Germany        
   43.254,6.637,French Riviera,France
   32.650,-16.908,Funchal,Portugual
   36.140,-5.353,Gibraltar
   57.708,11.974,Gothenburg,Sweden     
   53.548,9.987,Hamburg,Germany
   60.169,24.938,Helsinki,Finland
   39.020,1.482,Ibiza,Spain
   50.450,30.523,Kyiv,Ukraine
   61.115,10.466,Lillehammer,Norway
   38.722,-9.139,Lisbon,Portugual
   51.507,-0.127,London,England      
   40.416,-3.703,Madrid,Spain
   39.695,3.017,Mallorca,Spain
   53.480,-2.242,Manchester,England       
   43.296,5.369,Marseille,France
   27.760,-15.586,Maspalomas,Spain
   45.464,9.190,Milan,Italy
   48.135,11.582,Munich,Germany
   40.851,14.268,Naples,Italy
   43.034,-2.417,Oñati,Spain
   59.913,10.752,Oslo,Norway
   48.856,2.352,Paris,France
   50.075,14.437,Prague,Czech Republic
   64.146,-21.942,Reykjavík,Iceland
   56.879,24.603,Riga,Latvia
   41.902,12.496,Rome,Italy
   39.453,-31.127,Santa Cruz das Flores,Portugual
   28.463,-16.251,Santa Cruz de Tenerife,Spain
   47.565,122.333,Seattle,USA
   57.273,-6.215,Skye,Scotland
   42.697,23.321,Sofia,Bulgaria
   59.329,18.068,Stockholm,Sweden
   59.437,24.753,Tallinn,Estonia
   18.208,16.373,Vienna,Austria
   52.229,21.012,Warsaw,Poland
   53.961,-1.07,York,England
   47.376,8.541,Zurich,Switzerland`;

   // splits csvData into rows
   var rows = csvData.split('\n');

   // grabs the dropdown menu
   var dropdown = document.getElementById("cities");
   
   //populates the options menu
   for (let i = 1; i < rows.length; i++) {
      let cols = rows[i].split(',');

      let option = document.createElement('option');
      option.value = cols[0] + "," + cols[1];
      option.text = cols[2] + "," + cols[3];

      dropdown.appendChild(option);
   }
}

 // Function to get weather data (used in your application)
 async function getWeather(coordinates, useMockData = false) {
   const tempButton = document.getElementById("tempContainer");
   tempButton.classList.remove("d-none");
   document.getElementById("tempSwitch").checked = false;
   const response = await fetchWeatherData(coordinates, useMockData);
   // use mock data 
   if (useMockData) {
      weatherCard(response.dataseries[0].dataseries);
   } else {
      // uses api data'
      //console.log(response.dataseries); 
      weatherCard(response.dataseries);
   }
   tempChange();
 }

window.onload = function () {
   populateCities();
   weatherCities();
}