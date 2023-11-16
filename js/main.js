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
async function fetchWeatherData(coordinates, useMockData = true) {
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
 async function populateCities() {
    // Fetch CSV file
    fetch('city_coordinates.csv')
       .then(response => response.text())
       .then(csvData => {
          const rows = csvData.split('\n');
          const dropdown = document.getElementById("cities");
 
          rows.slice(1).forEach(row => {
             const cols = row.split(',');
 
             const option = document.createElement('option');
             option.value = `${cols[0]},${cols[1]}`;
             option.text = `${cols[2]},${cols[3]}`;
 
             dropdown.appendChild(option);
          });
       })
       .catch(error => console.error('Error fetching CSV:', error));
 }

 // Function to get weather data
 async function getWeather(coordinates, useMockData = true) {
   const tempButton = document.getElementById("tempContainer");
   tempButton.classList.remove("d-none");
   document.getElementById("tempSwitch").checked = false;
   const response = await fetchWeatherData(coordinates, useMockData);
   // use mock data 
   if (useMockData) {
      weatherCard(response.dataseries[0].dataseries);
   } else {
      // uses api data
      //console.log(response.dataseries); 
      weatherCard(response.dataseries);
   }
   tempChange();
 }

/*  window.addEventListener('load', function() {
    this.document.getElementById('loading').style.display = 'none';
    this.document.getElementById('weatherCard').style.display = 'visible';
 }) */

window.onload = function () {
   populateCities();
   weatherCities();
}