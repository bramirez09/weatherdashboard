var searchBoxEl = document.querySelector(".search-box");
var resultTextEl = document.querySelector(".result-text");
var resultContentEl = document.querySelector("#currentweatherdetails");
var forecastEl = document.getElementById ("#forecast");

function handleSearchForm(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector(".search-input").value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }
}

function getLocation(){
    // location
    var searchLocParam = document
    

  //  searchApi();
}

// function searchApi (query,format){
    // var locQueryapi=""
// }

// function printForecast(resultObj){

// }



searchBoxEl.addEventListener("submit", handleSearchForm);