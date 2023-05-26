var searchBoxEl = document.querySelector(".search-box");
var resultTextEl = document.querySelector(".result-text");
var cityButton = document.getElementById("cityName")
var forecastEl = document.getElementById("#forecast");
var apiKey = "6d31b19eb7d07b9d70d1e6b48620ae60";


function handleSearchForm(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector(".search-input").value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    getLocation(searchInputVal);
}

function getLocation(cityInput) {
    console.log("this is in geolocation:", cityInput);
    // location
    var newName = document.getElementById("cityInput");
    
    var searchHistoryContainer = document.getElementById("search-history");
    var citySearched = document.createElement("button");
    citySearched.setAttribute("id",cityName);
    citySearched.textContent = newName.value;
    searchHistoryContainer.append(citySearched);
    // cityName.innerHTML = newName.value;
    searchApi(cityInput);
    // document.querySelector(".search-input").innerHTML="";
    citySearched.addEventListener("click",callCityButton);
    // document.getElementById("currentweather").innerHTML="";
}


function searchApi(city) {
    
    var latLonUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    fetch(latLonUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var locQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        fetch(locQueryUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            var name = data.city.name;
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var windspeed = data.list[0].wind.speed;
            var weathericon = data.list[0].weather[0].icon;
            var today = data.list[0].dt_txt;
            var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
            var cityName = document.getElementById("cityName");
            var todaysDate = document.querySelector(".todaysdate");
            var tempEl = document.querySelector(".temp");
            var humidityEl = document.querySelector(".humidity");
            var windSpeed = document.querySelector(".windspeed");
            var weatherIcon = document.getElementById("img1");
            weatherIcon.setAttribute("src", iconurl);
            cityName.innerHTML = name;
            todaysDate.innerHTML = "Date: " + today;
            tempEl.innerHTML = "Temperature: " + temp + "°F";
            humidityEl.innerHTML = "Humidity: " + humidity + "%";
            windSpeed.innerHTML = "Wind Speed: " + windspeed + "mph";
            console.log("temp:"+temp,"humidity:"+ humidity, "windspeed:"+windspeed)
            printForecast(data);
        })

    })
}

function printForecast(forecastData) {

    //for loop here for 5 day forecast
    document.getElementById("forecast").innerHTML="";
    console.log(forecastData);

    for (i = 8; i < forecastData.list.length; i=i+8) {
        // console.log(forecastData.list[0].main.temp);
        // console.log(forecastData.list[i].dt_txt);
        
        var forecastContainer = document.getElementById("forecast");
        var date = document.createElement("li");
        var temperature = document.createElement("li");
        var humid = document.createElement("li");
        var winSpeed = document.createElement("li");
        var weatherpic = document.createElement("img");
        var weatherForecastIcon = forecastData.list[i].weather[0].icon;
        var weatherIconurl = "https://openweathermap.org/img/wn/" + weatherForecastIcon + "@2x.png";
        weatherpic.setAttribute("src", weatherIconurl);
        date.innerHTML = "Date: " + forecastData.list[i].dt_txt;
        temperature.innerHTML = "Temp: " + forecastData.list[i].main.temp + "°F";
        humid.innerHTML = "Humidity: " + forecastData.list[i].main.humidity + "%";
        winSpeed.innerHTML = "Wind Speed: " + forecastData.list[i].wind.speed + "mph";
        forecastContainer.append(date);
        forecastContainer.append(temperature);
        forecastContainer.append(humid);
        forecastContainer.append(winSpeed);
        forecastContainer.append(weatherpic);
    }
}

function callCityButton(){
    console.log(this.textContent);
    getLocation(this.textContent);
    searchApi(this.textContent);
    printForecast(this.textContent);
    // console.log(cityButton.textContent);
}

searchBoxEl.addEventListener("submit", handleSearchForm);
cityButton.addEventListener("click",callCityButton);

