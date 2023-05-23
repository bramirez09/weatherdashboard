var searchBoxEl = document.querySelector(".search-box");
var resultTextEl = document.querySelector(".result-text");

var forecastEl = document.getElementById("#forecast");
var apiKey = "6d31b19eb7d07b9d70d1e6b48620ae60";

function handleSearchForm(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector(".search-input").value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
    getLocation();
}

function getLocation() {
    // location
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--"

    searchApi();
}


function searchApi(city) {
    
    var latLonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    fetch(latLonUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var locQueryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(locQueryUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        })
        // var currentWeather = document.querySelector("#currentweatherdetails");
        // var tempEl = document.querySelector(".temp");
        // var humidityEl= document.querySelector(".humidity");
        // var windSpeed = document.querySelector(".windspeed");
        // tempEl.innerHTML = Number(data[0].list.main.temp);
        // humidityEl.innerHTML = Number(data[0].list.main.humidity);
        // windSpeed.innerHTML = Number (data[0].list.wind.speed);

    })
}

// function printForecast() {

    

// }



searchBoxEl.addEventListener("submit", handleSearchForm);
// searchApi();