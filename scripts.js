//This file is hidden by .gitignore to keep from sharing my API key.
import keys from './config.js';
//collection of background images
import backgrounds from './backgrounds.js';


const myKey = keys.myKey;
let city = document.getElementById('city').value;
const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&' + myKey;

const timeDiv = document.getElementById('time');
const weatherStatus = document.getElementById('weatherStatus');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDirection');



//function to determine cardinal direction from degrees
const cardinal = (angle) => {
    const directions = 8;
    const degree = 360 / directions;
    angle = angle + degree / 2;
    if (angle >= 0 * degree && angle < 1 * degree)
        return 'N';
    if (angle >= 1 * degree && angle < 2 * degree)
        return 'NE';
    if (angle >= 2 * degree && angle < 3 * degree)
        return 'E';
    if (angle >= 3 * degree && angle < 4 * degree)
        return 'SE';
    if (angle >= 4 * degree && angle < 5 * degree)
        return 'S';
    if (angle >= 5 * degree && angle < 6 * degree)
        return 'SW';
    if (angle >= 6 * degree && angle < 7 * degree)
        return 'W';
    if (angle >= 7 * degree && angle < 8 * degree)
        return 'NW';

    return 'N';
}

//object for weather icons
var weatherIcons = {
    '01d': "<i class='wi-lg wi wi-day-sunny ml-3'></i>", //Sunny Day
    '02d': "<i class='wi-lg wi wi-day-cloudy ml-3'></i>", //Cloudy Day
    '03d': "<i class='wi-lg wi wi-cloud ml-3'></i>", //Scattered Cloud Day
    '04d': "<i class='wi-lg wi wi-cloudy ml-3'></i>", //Broken Cloud Day
    '09d': "<i class='wi-lg wi wi-day-showers ml-3'></i>", //Rainy Day
    '10d': "<i class='wi-lg wi wi-day-rain ml-3'></i>", //Rainy Day
    '11d': "<i class='wi-lg wi wi-storm-showers ml-3'></i>", //Thunderstorms Day
    '13d': "<i class='wi-lg wi wi-snow ml-3'></i>", //Snowy Day
    '50d': "<i class='wi-lg wi wi-sprinkle ml-3'></i>", //Misty Day
    '01n': "<i class='wi-lg wi wi-stars ml-3'></i>", //Clear Night
    '02n': "<i class='wi-lg wi wi-night-alt-cloudy ml-3'></i>", //Cloudy night
    '03n': "<i class='wi-lg wi wi-night-partly-cloudy ml-3'></i>", //Scattered Cloud Night
    '04n': "<i class='wi-lg wi wi-cloudy ml-3'></i>", //Broken Cloud Night
    '09n': "<i class='wi-lg wi wi-night-alt-showers ml-3'></i>", //Rainy Night
    '10n': "<i class='wi-lg wi wi-rain ml-3'></i>", //Rainy Night
    '11n': "<i class='wi-lg wi wi-night-alt-lightning ml-3'></i>", //Thunderstorm Night
    '13n': "<i class='wi-lg wi wi-snowflake-cold ml-3'></i>", //Snowy Night
    '50n': "<i class='wi-lg wi wi-night-alt-sprinkle ml-3'></i>", //Misty Night
};

//function for appending weather data
const appendWeather = (weatherData) => {
    const tempF = ((weatherData.main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
    const tempC = (weatherData.main.temp - 273.15).toFixed(1);
    const dataIcon = weatherData.weather[0].icon;
    const weatherIcon = weatherIcons[weatherData.weather[0].icon];
    const unixTime = weatherData.dt;
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();;
    const weatherTime = hours + ':' + minutes;
    
    timeDiv.innerHTML = 'Updated at: ' + weatherTime;
    weatherStatus.innerHTML = weatherData.weather[0].main + weatherIcon;
    temperature.innerHTML = tempF + '&#176; F or ' + tempC + '&#176; C';
    windSpeed.innerHTML = weatherData.wind.speed + 'mph ';
    windDirection.innerHTML = cardinal(weatherData.wind.deg);


    //might be a better way to format this
    if (dataIcon === '01d') {
        document.body.style.backgroundImage = 'url(' + backgrounds.sunnyDay + ')';
    } else if (['02d', '03d', '04d'].indexOf(dataIcon) > -1) {
        document.body.style.backgroundImage = 'url(' + backgrounds.cloudyDay + ')';
    } else if (['09d', '10d', '11d', '50d'].indexOf(dataIcon) > -1) {
        document.body.style.backgroundImage = 'url(' + backgrounds.rainyDay + ')';
    }else if (dataIcon === '13n') {
        document.body.style.backgroundImage = 'url(' + backgrounds.snowyDay + ')';
    } else if (dataIcon === '01n') {
        document.body.style.backgroundImage = 'url(' + backgrounds.clearNight + ')';
    } else if (['02n', '03n', '04n', '09n'].indexOf(dataIcon) > -1) {
        document.body.style.backgroundImage = 'url(' + backgrounds.cloudyNight + ')';
    } else if (['09n', '10n', '11n', '50n'].indexOf(dataIcon) > -1) {
        document.body.style.backgroundImage = 'url(' + backgrounds.rainyNight + ')';
    } else if (dataIcon === '13n') {
        document.body.style.backgroundImage = 'url(' + backgrounds.snowyNight + ')';
    }
}

//initial weather
const getWeather = async() => {
    const response = await fetch(apiCall, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData)
    appendWeather(weatherData);
}
getWeather();

//Search Weather
const getNewWeather = async(city) => {
    city = document.getElementById('city').value;
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&' + myKey;
    const response = await fetch(apiCall, { mode: 'cors' });
    const weatherData = await response.json();
    console.log(weatherData);
    appendWeather(weatherData);
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getNewWeather);
document.getElementById('city')
    .addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('searchButton').click();
    }
});