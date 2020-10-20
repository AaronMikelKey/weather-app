let city = document.getElementById('city').value;
const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=5929c2bed7052947ef72a623c4f08aa3'

const weatherStatus = document.getElementById('weatherStatus');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDirection');



//function to determine cardinal direction from degrees
const cardinal = (angle) => {
    var directions = 8;
  
    var degree = 360 / directions;
    angle = angle + degree / 2;
  
    if (angle >= 0 * degree && angle < 1 * degree)
      return "N";
    if (angle >= 1 * degree && angle < 2 * degree)
      return "NE";
    if (angle >= 2 * degree && angle < 3 * degree)
      return "E";
    if (angle >= 3 * degree && angle < 4 * degree)
      return "SE";
    if (angle >= 4 * degree && angle < 5 * degree)
      return "S";
    if (angle >= 5 * degree && angle < 6 * degree)
      return "SW";
    if (angle >= 6 * degree && angle < 7 * degree)
      return "W";
    if (angle >= 7 * degree && angle < 8 * degree)
      return "NW";
    
    return "N";
  }

  //object for weather icons

var weatherIcons = {
    "01d": "<i class='wi-lg wi wi-day-sunny'></i>",
    "02d": "<i class='wi-lg wi wi-day-cloudy'></i>",
    "03d": "<i class='wi-lg wi wi-cloud'></i>",
    "04d": "<i class='wi-lg wi wi-cloudy'></i>",
    "09d": "<i class='wi-lg wi wi-day-showers'></i>",
    "10d": "<i class='wi-lg wi wi-day-rain'></i>",
    "11d": "<i class='wi-lg wi wi-storm-showers'></i>",
    "13d": "<i class='wi-lg wi wi-snow'></i>",
    "50d": "<i class='wi-lg wi wi-sprinkle'></i>",
    "01n": "<i class='wi-lg wi wi-stars'></i>",
    "02n": "<i class='wi-lg wi wi-night-alt-cloudy'></i>",
    "03n": "<i class='wi-lg wi wi-night-partly-cloudy'></i>",
    "04n": "<i class='wi-lg wi wi-cloudy'></i>",
    "09n": "<i class='wi-lg wi wi-night-alt-showers'></i>",
    "10n": "<i class='wi-lg wi wi-rain'></i>",
    "11n": "<i class='wi-lg wi wi-night-alt-lightning'></i>",
    "13n": "<i class='wi-lg wi wi-snowflake-cold'></i>",
    "50n": "<i class='wi-lg wi wi-night-alt-sprinkle'></i>",
  }

async function getWeather() {
    const response = await fetch(apiCall, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData)

    const tempF = ((weatherData.main.temp -273.15) * 9/5 + 32).toFixed(0);
    const weatherIcon = weatherIcons[weatherData.weather[0].icon];

    weatherStatus.innerHTML = weatherData.weather[0].main + weatherIcon;
    temperature.innerHTML = tempF + "&#176; F";
    windSpeed.innerHTML = weatherData.wind.speed + "mph ";
    windDirection.innerHTML = cardinal(weatherData.wind.deg);
}

getWeather();

