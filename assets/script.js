let apiKey = 'edf8324ddc0c19c6ba6226fff1e2b0e7';
// let city ='Toronto';

let todayDate = moment().format('L');;

let searchCity = $('#city-name');
let cityList = $('.city-list');
let searchBtn = $('#search-btn');
let searchForm = $('.search-form');

// creats city List on clicking search button
function createCityList(city) {
    let citysearched = $('<li>').addClass('p-2 btn btn-primary btn-sm btn-block btnBorder city-searched').text(city);
    cityList.append(citysearched);
}

searchBtn.on('click', function () {
    //display weather today
    $('.cardBorder2').css('display', 'block');
    //
    let city = searchCity.val().trim();
    createCityList(city);
    searchForm[0].reset();

    //getiing weather data
    let urlRequest = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + '&units=metric';
    let urlRequest2 = "http://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&appid=" + apiKey + '&units=metric&cnt=40';

    fetch(urlRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // include icon of weather
            let iconeCode = data.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/w/" + iconeCode + ".png";
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


    fetch(urlRequest2)
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

            // let day2AverageTemp=dailyWeather[0][0].main.temp;
            // console.log(day2AverageTemp);
            let day2AverageTemp = 0;
            let day2AverageWind =0;
            let day2AverageHumidity=0;
            let day3AverageTemp = 0;
            let day3AverageWind =0;
            let day3AverageHumidity=0;
            let day4AverageTemp = 0;
            let day4AverageWind =0;
            let day4AverageHumidity=0;
            let day5AverageTemp = 0;
            let day5AverageWind =0;
            let day5AverageHumidity=0;
            let day6AverageTemp = 0;
            let day6AverageWind =0;
            let day6AverageHumidity=0;
            for (let k = 0; k < dailyWeather[0].length; k++) {
                day2AverageTemp += (dailyWeather[0][k].main.temp);
                day2AverageWind +=(dailyWeather[0][k].wind.speed);
                day2AverageHumidity += (dailyWeather[0][k].main.humidity);

                day3AverageTemp += (dailyWeather[1][k].main.temp);
                day3AverageWind +=(dailyWeather[1][k].wind.speed);
                day3AverageHumidity += (dailyWeather[1][k].main.humidity);

                day4AverageTemp += (dailyWeather[2][k].main.temp);
                day4AverageWind +=(dailyWeather[2][k].wind.speed);
                day4AverageHumidity += (dailyWeather[2][k].main.humidity);

                day5AverageTemp += (dailyWeather[3][k].main.temp);
                day5AverageWind +=(dailyWeather[3][k].wind.speed);
                day5AverageHumidity += (dailyWeather[3][k].main.humidity);

                day6AverageTemp += (dailyWeather[4][k].main.temp);
                day6AverageWind +=(dailyWeather[4][k].wind.speed);
                day6AverageHumidity += (dailyWeather[4][k].main.humidity);
            }

            day2AverageTemp = day2AverageTemp/8;
            day2AverageWind = day2AverageWind/8;
            day2AverageHumidity= day2AverageHumidity/8;

            day3AverageTemp = day3AverageTemp/8;
            day3AverageWind = day3AverageWind/8;
            day3AverageHumidity= day3AverageHumidity/8;

            day4AverageTemp = day4AverageTemp/8;
            day4AverageWind = day4AverageWind/8;
            day4AverageHumidity= day4AverageHumidity/8;

            day5AverageTemp = day5AverageTemp/8;
            day5AverageWind = day5AverageWind/8;
            day5AverageHumidity= day5AverageHumidity/8;

            day6AverageTemp = day6AverageTemp/8;
            day6AverageWind = day6AverageWind/8;
            day6AverageHumidity= day6AverageHumidity/8;

            console.log(day6AverageHumidity);

            $('.forcast-heading').addClass('p-2 text-center').text("Next 5-Day Forecast:");
        });
});






