//Note:
//Given the confusion with question 1 and 3, I decided to go for a two button alternative,
//where one button shows the local weather, while the other shows Chicago's weather.
//index.html was modified accordingly


//Getting local weather:
let getWeather = function(extractInfo) {
  console.info("Your current position is")
  console.info("Latitude:",extractInfo.coords.latitude.toFixed(4))
  console.info("Longitude:",extractInfo.coords.longitude.toFixed(4))

  let latitude = extractInfo.coords.latitude.toFixed(4);
  let longitude = extractInfo.coords.longitude.toFixed(4);
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'

  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

  fetch(openweathermap_api_url).then(convertDataToJSON).then(updateWeather).catch(displayError);
}



//Getting Chicago's weather:
let getChicagoWeather = function(extractInfo) {

  let latitude = '41.8781';
  let longitude = '-87.6298';
  let openweathermap_api_url = 'https://api.openweathermap.org/data/2.5/weather?'

  openweathermap_api_url += 'lat=' + latitude
  openweathermap_api_url += '&lon=' + longitude
  openweathermap_api_url +='&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial'

  fetch(openweathermap_api_url).then(convertDataToJSON).then(updateWeather).catch(displayError);
}

// Chicago weather link (to explore what comes back):
// https://api.openweathermap.org/data/2.5/weather?lat=41.8781&lon=-87.6298&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial



let convertDataToJSON = function(response) {
  return response.json();
}




//Replacing icon and text:
let updateWeather = function(weatherData) {
  //console.debug(weatherData)
  temperatureFahrenheit = weatherData.main.temp;
  geographicLocation = weatherData.name;
  weatherIcon = weatherData.weather[0].icon;
  weatherIconUrl = "http://openweathermap.org/img/w/"+weatherIcon+".png";
  document.querySelector("h4.card-title").innerHTML = geographicLocation;
  document.querySelector("p.card-text").innerHTML = "It is " + temperatureFahrenheit + " degrees outside.";
  document.querySelector("img.card-img-top").src =   weatherIconUrl;
}


//Error message if code fails:
let displayError = function(error) {
  console.debug(error);
  window.alert("This Code is Madness!");
}



//Local weather trigger:
let getLocalTemperature = document.getElementById("get_forecast")
getLocalTemperature.addEventListener("click", function(event){
navigator.geolocation.getCurrentPosition(getWeather);
});



//Chicago weather trigger:
let getChicagoTemperature = document.getElementById("get_chicago_forecast")
getChicagoTemperature.addEventListener("click", getChicagoWeather);








































// HINT:
// Weather icon example: http://openweathermap.org/img/w/10d.png
// The very last part ('10d.png') can change based on the current conditions.


// https://api.openweathermap.org/data/2.5/weather?lat=41.8781&lon=-87.6298&appid=4ce6f502d38ddae567bf1702b05e168c&units=imperial
