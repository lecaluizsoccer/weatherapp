let weatherForecast = {}
const place = document.querySelector("#input-text");
const body = document.querySelector("body");
const local = document.querySelector(".local");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const visibility = document.querySelector(".visibility");


const weatherMetric = {
  unit: "metric",
  heat: "°C",
  speed: "kph",
  dist: "km"
};

const weatherImperial = {
  unit: "imperial",
  heat: "°F",
  speed: "mph",
  dist: "mi",
};

let unit = weatherMetric.unit;
let heat = weatherMetric.heat;
let speed = weatherMetric.speed;
let dist = weatherMetric.dist;



function isInputFilled() {
  return place.value.trim() !== "";
}

place.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

body.addEventListener("click", (e) => {
    if (e.target.classList.contains("celsius")) {
      unit = weatherMetric.unit;
      heat = weatherMetric.heat;
      speed = weatherMetric.speed;
      dist = weatherMetric.dist;
      getWeather();
    } else if (e.target.classList.contains("fahrenheit")) {
      unit = weatherImperial.unit;
      heat = weatherImperial.heat;
      speed = weatherImperial.speed;
      dist = weatherImperial.dist;
      getWeather();
    }
})




function getWeather(){
    if(isInputFilled()){
      fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${place.value}&units=${unit}`)
      .then((response) => response.json())
      .then((data) => {
          Object.assign(weatherForecast, data);
          console.log(weatherForecast);
          updateWeatherDisplay()
      });
    } else {
            fetch(
              `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=vila barros&units=${unit}`
            )
              .then((response) => response.json())
              .then((data) => {
                Object.assign(weatherForecast, data);
                console.log(weatherForecast);
                updateWeatherDisplay();
              });
      
    }
      
}

function updateWeatherDisplay() {
    local.textContent = `⚐ ${weatherForecast.name}`;
    temp.textContent = `${Math.round(weatherForecast.main.temp)}${heat}`;
    feelsLike.textContent = `${Math.round(weatherForecast.main.feels_like)}${heat}`;
    maxTemp.textContent = `Max ${Math.round(weatherForecast.main.temp_max)}${heat}`;
    minTemp.textContent = `Min ${Math.round(weatherForecast.main.temp_min)}${heat}`;

    humidity.textContent = `${Math.round(weatherForecast.main.humidity)}%`;
    windSpeed.textContent = `${Math.round(weatherForecast.wind.speed)} ${speed}`;
    visibility.textContent = `${Math.round(weatherForecast.visibility / 1000)} ${dist}`;

}

getWeather();

