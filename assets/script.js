let apiKey = 'edf8324ddc0c19c6ba6226fff1e2b0e7';
// let city ='Toronto';

let todayDate = moment().format('L');;

let searchCity = $('#city-name');
let cityList = $('.city-list');
let searchBtn = $('#search-btn');
let searchForm = $('.search-form');
let cities = [];
// creats city List on clicking search button
function createCityList(city) {
    let citysearched = $('<li>').addClass('p-2 btn btn-primary btn-sm btn-block btnBorder city-searched').text(city);
    cityList.append(citysearched);
    // localStorage.setItem("cityNames", citysearched[0].val());
}

function saveCitiesInStorage() {
    localStorage.setItem("cityList", JSON.stringify(cities));
}

function init() {
    let savedCitlyList = JSON.parse(localStorage.getItem("cityList"));
    if (savedCitlyList !== null) {
        cities = savedCitlyList;
    }
    for (let i = 0; i < cities.length; i++) {
        createCityList(savedCitlyList[i]);
    }

}
init();

function makeCityList(city) {
    cities.push(city);
}

$('ul').on("click", '.city-searched', function (e) {
    e.preventDefault();
    $('.cardBorder2').css('display', 'block');
    let city = $(this).text();
    console.log(city);

    let urlRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + '&units=metric';
    let urlRequest2 = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=" + apiKey + '&units=metric&cnt=40';
    getCurrentWeather(urlRequest);
    getDailyWeather(urlRequest2);

});


searchBtn.on('click', function (e) {
    e.preventDefault();
    //display weather today
    let city = searchCity.val().trim();
    if (city !== "") {
        createCityList(city);
        $('.cardBorder2').css('display', 'block');
        //
        makeCityList(city);
        saveCitiesInStorage();
        searchForm[0].reset();


        //getiing weather data
        let urlRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + '&units=metric';
        let urlRequest2 = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=" + apiKey + '&units=metric&cnt=40';
        getCurrentWeather(urlRequest);
        getDailyWeather(urlRequest2);
    }else{
        return;
    }


});

function getCurrentWeather(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // include icon of weather
            let iconeCode = data.weather[0].icon;
            let iconUrl = "https://openweathermap.org/img/w/" + iconeCode + ".png";
            let imageIcon = $('<img>').addClass('weather-icon').attr('src', iconUrl);
            let temparature = data.main.temp;
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;
            console.log(data);
            console.log(data.name + " " + todayDate + " " + data.weather[0].icon);
            console.log(data.main.temp);
            console.log(data.wind.speed);
            console.log(data.main.humidity);
            let nameAndDate = data.name + " (" + todayDate + ") ";

            $('.current-weather-condition').addClass('p-2').text(nameAndDate);
            $('.current-weather-condition').append(imageIcon);
            $('.current-weather-condition').append($('<p>').addClass('p-2').text("Temparature: " + temparature + "\u00B0" + "C"));
            $('.current-weather-condition').append($('<p>').addClass('p-2').text("Wind Speed: " + windSpeed + "MPH"));
            $('.current-weather-condition').append($('<p>').addClass('p-2').text("Humidity: " + humidity + "%"));


        });
}

function getDailyWeather(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //get 5 days of weather every 3 hours
            let dailyWeather = [];
            for (let i = 0; i < data.list.length; i += 8) {
                dailyWeather.push(data.list.slice(i, i + 8));
            }
            console.log(dailyWeather);
            console.log(moment().add(1, 'days').format('MM-DD-YYYY'));
            let day2Date = moment().add(1, 'days').format('MM-DD-YYYY');
            let day3Date = moment().add(2, 'days').format('MM-DD-YYYY');
            let day4Date = moment().add(3, 'days').format('MM-DD-YYYY');
            let day5Date = moment().add(4, 'days').format('MM-DD-YYYY');
            let day6Date = moment().add(5, 'days').format('MM-DD-YYYY');
            // let day2AverageTemp=dailyWeather[0][0].main.temp;
            // console.log(day2AverageTemp);
            let day2AverageTemp = 0;
            let day2AverageWind = 0;
            let day2AverageHumidity = 0;
            let day3AverageTemp = 0;
            let day3AverageWind = 0;
            let day3AverageHumidity = 0;
            let day4AverageTemp = 0;
            let day4AverageWind = 0;
            let day4AverageHumidity = 0;
            let day5AverageTemp = 0;
            let day5AverageWind = 0;
            let day5AverageHumidity = 0;
            let day6AverageTemp = 0;
            let day6AverageWind = 0;
            let day6AverageHumidity = 0;
            for (let k = 0; k < dailyWeather[0].length; k++) {
                day2AverageTemp += (dailyWeather[0][k].main.temp);
                day2AverageWind += (dailyWeather[0][k].wind.speed);
                day2AverageHumidity += (dailyWeather[0][k].main.humidity);

                day3AverageTemp += (dailyWeather[1][k].main.temp);
                day3AverageWind += (dailyWeather[1][k].wind.speed);
                day3AverageHumidity += (dailyWeather[1][k].main.humidity);

                day4AverageTemp += (dailyWeather[2][k].main.temp);
                day4AverageWind += (dailyWeather[2][k].wind.speed);
                day4AverageHumidity += (dailyWeather[2][k].main.humidity);

                day5AverageTemp += (dailyWeather[3][k].main.temp);
                day5AverageWind += (dailyWeather[3][k].wind.speed);
                day5AverageHumidity += (dailyWeather[3][k].main.humidity);

                day6AverageTemp += (dailyWeather[4][k].main.temp);
                day6AverageWind += (dailyWeather[4][k].wind.speed);
                day6AverageHumidity += (dailyWeather[4][k].main.humidity);
            }

            day2AverageTemp = Math.round((day2AverageTemp / 8));
            day2AverageWind = Math.round(day2AverageWind / 8);
            day2AverageHumidity = day2AverageHumidity / 8;

            day3AverageTemp = Math.round(day3AverageTemp / 8);
            day3AverageWind = Math.round(day3AverageWind / 8);
            day3AverageHumidity = day3AverageHumidity / 8;

            day4AverageTemp = Math.round(day4AverageTemp / 8);
            day4AverageWind = Math.round(day4AverageWind / 8);
            day4AverageHumidity = day4AverageHumidity / 8;

            day5AverageTemp = Math.round(day5AverageTemp / 8);
            day5AverageWind = Math.round(day5AverageWind / 8);
            day5AverageHumidity = day5AverageHumidity / 8;

            day6AverageTemp = Math.round(day6AverageTemp / 8);
            day6AverageWind = Math.round(day6AverageWind / 8);
            day6AverageHumidity = day6AverageHumidity / 8;

            console.log(day6AverageHumidity);
            // setting up icons
            let iconeCode2 = dailyWeather[0][4].weather[0].icon;
            let iconUrl2 = "https://openweathermap.org/img/w/" + iconeCode2 + ".png";
            let imageIcon2 = $('<img>').addClass('weather-icon').attr('src', iconUrl2);
            // console.log(iconeCode2);

            let iconeCode3 = dailyWeather[1][4].weather[0].icon;
            let iconUrl3 = "https://openweathermap.org/img/w/" + iconeCode3 + ".png";
            let imageIcon3 = $('<img>').addClass('weather-icon').attr('src', iconUrl3);

            let iconeCode4 = dailyWeather[2][4].weather[0].icon;
            let iconUrl4 = "https://openweathermap.org/img/w/" + iconeCode4 + ".png";
            let imageIcon4 = $('<img>').addClass('weather-icon').attr('src', iconUrl4);

            let iconeCode5 = dailyWeather[3][4].weather[0].icon;
            let iconUrl5 = "https://openweathermap.org/img/w/" + iconeCode5 + ".png";
            let imageIcon5 = $('<img>').addClass('weather-icon').attr('src', iconUrl5);

            let iconeCode6 = dailyWeather[4][4].weather[0].icon;
            let iconUrl6 = "https://openweathermap.org/img/w/" + iconeCode6 + ".png";
            let imageIcon6 = $('<img>').addClass('weather-icon').attr('src', iconUrl6);

            $('.forcast-heading').addClass('p-2 text-center').text("Next 5-Day Forecast:");

            $('.day2').addClass('col').text(day2Date);
            $('.day2').append(imageIcon2);
            $('.day2').append($('<p>').addClass('p-2').text("Temparature: " + day2AverageTemp + "\u00B0" + "C"));
            $('.day2').append($('<p>').addClass('p-2').text("Wind Speed: " + day2AverageWind + "MPH"));
            $('.day2').append($('<p>').addClass('p-2').text("Humidity: " + day2AverageHumidity + "%"));

            $('.day3').addClass('col').text(day3Date);
            $('.day3').append(imageIcon3);
            $('.day3').append($('<p>').addClass('p-2').text("Temparature: " + day3AverageTemp + "\u00B0" + "C"));
            $('.day3').append($('<p>').addClass('p-2').text("Wind Speed: " + day3AverageWind + "MPH"));
            $('.day3').append($('<p>').addClass('p-2').text("Humidity: " + day3AverageHumidity + "%"));

            $('.day4').addClass('col').text(day4Date);
            $('.day4').append(imageIcon4);
            $('.day4').append($('<p>').addClass('p-2').text("Temparature: " + day4AverageTemp + "\u00B0" + "C"));
            $('.day4').append($('<p>').addClass('p-2').text("Wind Speed: " + day4AverageWind + "MPH"));
            $('.day4').append($('<p>').addClass('p-2').text("Humidity: " + day4AverageHumidity + "%"));

            $('.day5').addClass('col').text(day5Date);
            $('.day5').append(imageIcon5);
            $('.day5').append($('<p>').addClass('p-2').text("Temparature: " + day5AverageTemp + "\u00B0" + "C"));
            $('.day5').append($('<p>').addClass('p-2').text("Wind Speed: " + day5AverageWind + "MPH"));
            $('.day5').append($('<p>').addClass('p-2').text("Humidity: " + day5AverageHumidity + "%"));

            $('.day6').addClass('col').text(day6Date);
            $('.day6').append(imageIcon6);
            $('.day6').append($('<p>').addClass('p-2').text("Temparature: " + day6AverageTemp + "\u00B0" + "C"));
            $('.day6').append($('<p>').addClass('p-2').text("Wind Speed: " + day6AverageWind + "MPH"));
            $('.day6').append($('<p>').addClass('p-2').text("Humidity: " + day6AverageHumidity + "%"));
        });
}




