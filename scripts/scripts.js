var latitude;
var longitude;
var temperature;
var tempF;
var city;
var cond;
var weatherId;
//convert Centigrades to Farenheit
function convertToF(temperature) {
  tempF = ((temperature * 1.8) + 32);
  tempF = tempF.toFixed(1);
  return tempF;
}
//read the actual time
var clock = new Date();
//the place to put the time
var time = document.getElementById("time");
//function to add zeroes to the format of the time
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
//get time and add zeroes
var hour = addZero(clock.getHours());
var min = addZero(clock.getMinutes());
//write the time to the html
time.innerHTML =  hour + ":" + min ;


//callback function to read the data from the weather
function getWeather(data) {
  //read temp
  temperature = data.main.temp;
  temperature = temperature.toFixed(1);
  //read conditions (sunny, cloudy, etc)
  cond = data.weather[0].description;
  //convert to farenheit
  convertToF(temperature);
  //write the temperature to the html in C and F
  var tempCen = document.getElementById("tempCen");
  tempCen.innerHTML = temperature + "ºC";
  var tempFar = document.getElementById("tempFar");
  tempFar.innerHTML = tempF + "ºF";
  //write the conditions to html
  var textCond = document.getElementById("textCond");
  textCond.innerHTML = cond;
  //change to the other temp
  var btnConvert = document.getElementById("btnConvert");
  //write a function to show farenheit or celcius
  var unitButF = document.getElementById("unitButF");
  var unitButC = document.getElementById("unitButC");
  function changeTemp(){
    $(tempCen).fadeToggle().toggleClass("hidden");
    $(tempFar).fadeToggle().toggleClass("hidden");
    $(unitButF).fadeToggle().toggleClass("hidden");
    $(unitButC).fadeToggle().toggleClass("hidden");
  }
  //change the temp on click of button
  btnConvert.onclick = changeTemp;
  //change of images and icons according to conditions
  var imgCond = document.getElementById("imgCond");
  weatherId = data.weather[0].id;

  if(weatherId === 800){
    $(imgCond).removeClass();
    $(imgCond).addClass("clear icons");
    $('body').removeClass();
    $('body').addClass("bgClear bgImg");
  }else if (weatherId >= 200 && weatherId <= 232) {
    $(imgCond).removeClass();
    $(imgCond).addClass("thunder icons");
    $('body').removeClass();
    $('body').addClass("bgThunder bgImg");
  }else if (weatherId >= 300 && weatherId <= 321) {
    $(imgCond).removeClass();
    $(imgCond).addClass("drizzle icons");
    $('body').removeClass();
    $('body').addClass("bgDrizzle bgImg");
  }else if (weatherId >= 500 && weatherId <= 531) {
    $(imgCond).removeClass();
    $(imgCond).addClass("rain icons");
    $('body').removeClass();
    $('body').addClass("bgRain bgImg");
  }else if (weatherId >= 600 && weatherId <= 622) {
    $(imgCond).removeClass();
    $(imgCond).addClass("snow icons");
    $('body').removeClass();
    $('body').addClass("bgSnow bgImg");
  }else if (weatherId >= 701 && weatherId <= 781) {
    $(imgCond).removeClass();
    $(imgCond).addClass("fog icons");
    $('body').removeClass();
    $('body').addClass("bgFog bgImg");
  }else if (weatherId >= 801 && weatherId <= 804) {
    $(imgCond).removeClass();
    $(imgCond).addClass("clouds icons");
    $('body').removeClass();
    $('body').addClass("bgClouds bgImg");
  }

}
//read the location info
function getLocation(data){
  latitude = data.lat;
  longitude = data.lon;
  city = data.city;
  var cityTitle = document.getElementById("cityTitle");
  cityTitle.innerHTML = city;
  //console.log("latitud: " + latitude + " lon: " + longitude + " city: " + city);
  //call openweathermap
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=9dc1be590fc08a7d6b24934b74bfd339", getWeather);
}

//call ip-api to log the location and call the main function
$.getJSON("http://ip-api.com/json/?fields=city,lat,lon", getLocation);

//reload page if button is clicked
var btnReload = document.getElementById("btnReload");
function reloadPage(){
  window.location.reload();
}
btnReload.onclick = reloadPage;
//loose focus of the buttons after being clicked
$(".btn").mouseup(function(){
    $(this).blur();
});
