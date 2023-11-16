// Card component HTML
function component (dataseries, i) {
   const low = dataseries.temp2m.min;
   const high = dataseries.temp2m.max;
   const date = convertDate(dataseries.date);
   const weatherPic = weatherImage(dataseries.weather, dataseries.wind10m_max);
   return `
      <img src="${weatherPic}" class="card-img" alt="..." id="weatherPic${i}">
      <div class="card-body text-center">
      <h5 class="card-title" id="currentDate${i}">${date}</h5>
      <p class="card-text" id="weather${i}">${dataseries.weather}</p>
      <p class="card-text" id="lowTemp${i}">${low}°C Low</p>
      <p class="card-text" id="highTemp${i}">${high}°C High</p>
      </div>
   `;
}


// Calls a function to create the weather cards
export function weatherCard (dataseries) {
   //console.log(dataseries.length);
   const cards = document.getElementById("weather0");
   if (cards) {
      for (let i = 0; i < dataseries.length; i++) {
         updateCard(dataseries[i], i);
      }
   } else {
      for (let i = 0; i < dataseries.length; i++) {
         var card = createCard(dataseries[i], i);
         document.getElementById("weatherCard").appendChild(card);
      }
   }
}

// creates a weather card
export function createCard(dataseries, i) {
   const container = document.createElement('div');
   container.setAttribute("class", "card p-1 m-1 shadow-lg bg-body rounded cardBg");
   container.setAttribute("style", "width: 100%");
   container.setAttribute("id", "card" + i);
   container.innerHTML = component(dataseries, i);
   container.classList.add("col-sm-12", "col-xl", "col-md-4", "col-lg");
   return container;
}

// updates the weather cards with new information
function updateCard(dataseries, i) {
   //console.log(typeof dataseries.date);
   document.getElementById("currentDate"+ i).innerText = convertDate(dataseries.date);
   document.getElementById("weather"+ i).innerText = dataseries.weather;
   document.getElementById("lowTemp"+ i).innerText = dataseries.temp2m.min+"°C Low";
   document.getElementById("highTemp"+ i).innerText = dataseries.temp2m.max+"°C High";
   const weather = weatherImage(dataseries.weather, dataseries.wind10m_max);
   document.getElementById("weatherPic" + i).setAttribute("src", weather);
}

// returns the image path for the weather type
function weatherImage(weather, wind10m_max) {
   //console.log(weather);
   //console.log(wind10m_max);
   const weatherImages = {
      "pcloudy": "images/pcloudy.png",
      "mcloudy": "images/mcloudy.png",
      "cloudy": "images/cloudy.png",
      "humid": "images/humid.png",
      "lightrain": "images/lightrain.png",
      "oshower": "images/oshower.png",
      "ishower": "images/ishower.png",
      "lightsnow": "images/lightsnow.png",
      "rain": "images/rain.png",
      "snow": "images/snow.png",
      "rainsnow": "images/rainsnow.png",
      "clear": "images/clear.png",
      "tsrain": "images/tsrain.png",
      "fog": "images/fog.png",
      "tstorm": "images/tstorm.png",
      "windy": "images/windy.png"
  };
  if (wind10m_max >= 6) {
   return weatherImages["windy"];
  }

  return weatherImages[weather];

}

// Changes the temperature between Celsius and Fahrenheit
export function tempChange () {
   const tempButton = document.getElementById("tempSwitch");
   const originalTemps = [];
   for(let i = 0; i < 7; i++) {
      let lowTemp = document.getElementById("lowTemp" + i);
      let highTemp = document.getElementById("highTemp"+ i);
      originalTemps.push({low: parseInt(lowTemp.innerText), high: parseInt(highTemp.innerText)});
   }
   //console.log(originalTemps);
   tempButton.addEventListener("change", function () {
      for (let i = 0; i < 7; i++) {
         let lowTemp = document.getElementById("lowTemp" + i);
         let highTemp = document.getElementById("highTemp" + i);

         if (tempButton.checked) {
            let newLow = Math.round((originalTemps[i].low * (9 / 5)) + 32);
            lowTemp.innerText = newLow + "°F Low";

            let newHigh = Math.round((originalTemps[i].high * (9 / 5)) + 32);
            highTemp.innerText = newHigh + "°F High";
         } else {
            lowTemp.innerText = originalTemps[i].low + "°C High" ;
            highTemp.innerText = originalTemps[i].high + "°C High" ;
         }
      }
   });
}

function convertDate(dateInput) {
   const dateString = dateInput.toString();

   // Parse the input string into a Date object
   const date = new Date(`${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(6, 2)}`);

   // Get the day and date in a readable format
   const options = { weekday: 'short', month: 'short', day: 'numeric' };
   const formattedDate = date.toLocaleDateString('en-US', options);

   return formattedDate;
}