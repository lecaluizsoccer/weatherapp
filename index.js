let weatherForcast = {}
const place = document.querySelector("#input-text");
const body = document.querySelector("body");
let unit = "metric"

let heat = "°C";
let speed = "kph"
let dist = "km"

function isInputFilled() {
  return place.value.trim() !== "";
}

place.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

body.addEventListener("click", (e) => {
  if(isInputFilled()){
    if (e.target.classList.contains("celsius")) {
      unit = "metric";
      heat = "°C";
      speed = "kph";
      dist = "km";
      getWeather();
    } else if (e.target.classList.contains("fahrenheit")) {
      unit = "imperial";
      heat = "°F";
      speed = "mph";
      dist = "mi";
      getWeather();
    }
  } else {
    document.querySelector(".local").textContent = "Type a location"
  }
})




function getWeather(){
    if(isInputFilled()){
      fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${place.value}&units=${unit}`)
      .then((response) => response.json())
      .then((data) => {
          Object.assign(weatherForcast, data);
          console.log(weatherForcast);
          updateWeatherDisplay()
      });
  } else {
    document.querySelector(".local").textContent = "Type a location";
  }
    
}

function updateWeatherDisplay() {
    document.querySelector(".local").textContent = `⚐ ${weatherForcast.name}`;
    document.querySelector(".temp").textContent = `${Math.round(weatherForcast.main.temp)}${heat}`;
    document.querySelector(".feels-like").textContent = `${Math.round(weatherForcast.main.feels_like)}${heat}`;
    document.querySelector(".max-temp").textContent = `Max ${Math.round(weatherForcast.main.temp_max)}${heat}`;
    document.querySelector(".min-temp").textContent = `Min ${Math.round(weatherForcast.main.temp_min)}${heat}`;

    document.querySelector(".humidity").textContent = `${Math.round(weatherForcast.main.humidity)}%`;
    document.querySelector(".wind-speed").textContent = `${Math.round(weatherForcast.wind.speed)} ${speed}`;
    document.querySelector(".visibility").textContent = `${Math.round(weatherForcast.visibility / 1000)} ${dist}`;

}

