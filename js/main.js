import { createCard, populateCities } from "./card.js";

// Grabs the coordinates from the selected option
function weatherCities () {
   var dropdown = document.getElementById("cities");
   var weatherCard = document.getElementById("weatherCard");

   dropdown.addEventListener("change", function () {
      var chosen = dropdown.options[dropdown.selectedIndex];
      var coordinates = chosen.value.split(',');
      console.log(coordinates[0] + "," + coordinates[1]);
      getWeather(coordinates);
   });
}

// Makes the API call for the weather data for the selected city.
async function getWeather (coordinates) {
   const params = {
      "lon":coordinates[1],
      "lat":coordinates[0],
      "product":"civillight",
      "output":"json"
   }
   var url = "http://www.7timer.info/bin/api.pl?";

   const response = await fetch(url + new URLSearchParams(params))
      .then(response =>response.json());
   //console.log(typeof response["dataseries"]);
   weatherCard(response["dataseries"]);
}

// Calls a function to create the weather cards
function weatherCard (dataseries) {
   for (let i = 0; i < dataseries.length; i++) {
      var card = createCard(dataseries[i]);
      document.getElementById("weatherCard").appendChild(card);
   }
}


window.onload = function () {
   populateCities();
   weatherCities();
}