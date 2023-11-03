// Card component HTML
function component (dataseries, i) {
   const low = dataseries.temp2m.min;
   const high = dataseries.temp2m.max;
   const weatherPic = weatherImage(dataseries.weather, dataseries.wind10m_max);
   return `
      <img src="${weatherPic}" class="card-img" alt="..." id="weatherPic${i}">
      <div class="card-body text-center">
      <h5 class="card-title" id="currentDate${i}">${dataseries.date}</h5>
      <p class="card-text" id="weather${i}">${dataseries.weather}</p>
      <p class="card-text" id="lowTemp${i}">${low}</p>
      <p class="card-text" id="highTemp${i}">${high}</p>
      </div>
   `;
}


// Calls a function to create the weather cards
export function weatherCard (dataseries) {
   //console.log(dataseries);
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
   container.setAttribute("style", "width: 10rem")
   container.setAttribute("id", "card" + i);
   container.innerHTML = component(dataseries, i);
   return container;
}

function updateCard(dataseries, i) {
   //console.log(dataseries);
   document.getElementById("currentDate"+ i).innerText = dataseries.date;
   document.getElementById("weather"+ i).innerText = dataseries.weather;
   const lowtemp = dataseries.temp2m.min;
   const hightemp = dataseries.temp2m.max;
   document.getElementById("lowTemp"+ i).innerText = lowtemp;
   document.getElementById("highTemp"+ i).innterText = hightemp;
   const weather = weatherImage(dataseries.weather, dataseries.wind10m_max);
   document.getElementById("weatherPic" + i).setAttribute("src", weather);
}

function weatherImage(weather, wind10m_max) {
   //console.log(weather);
   //console.log(wind10m_max);
   if (wind10m_max >= 6) {
      return "/images/windy.png";
   } else if (weather === "pcloudy") {
      return "images/pcloudy.png";
   } else if (weather === "mcloudy") {
      return "images/mcloudy.png";
   } else if (weather === "cloudy") {
      return "images/cloudy.png";
   } else if (weather === "humid") {
      return "images/humid.png";
   } else if (weather === "lightrain") {
      return "images/lightrain.png";
   } else if (weather === "oshower") {
      return "images/oshower.png";
   } else if (weather === "ishower") {
      return "images/ishower.png";
   } else if (weather === "lightsnow") {
      return "images/lightsnow.png";
   } else if (weather === "rain") {
      return "images/rain.png";
   } else if (weather === "snow") {
      return "images/snow.png";
   } else if (weather === "rainsnow") {
      return "images/rainsnow.png";
   } else if (weather === "clear"){
      return "images/clear.png";
   } else if (weather === "tsrain") {
      return "images/tsrain.png";
   } else if (weather === "fog") {
      return "images/fog.png";
   } else {
      return "images/tstorm.png";
   }
}

export function tempChange (temp, type) {
   console.log(temp + " " + type);
}