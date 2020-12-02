const button = document.getElementById("searchBtn");
const searchField = document.querySelector(".searchField");
const locationName = document.getElementById("locName");
const forecast = document.getElementById("forecastDesc");
const temp = document.getElementById("temperature");
const iconImg = document.getElementById("weatherIcon");


const getSearchValue = () => {
  const textData = searchField.value;
  // Rethink now I'm gonna clear the searchfield.
  // searchField.value = "";
  return textData;
};

const clearSearchField = () => {
  searchField.value = "";
};

const keyDownReturn = (event) => {
  if(event.keyCode == 13) document.getElementById('searchBtn').click();
};

const getFetchData = async () => {
  try {
    const weatherURLResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getSearchValue()}&appid=67fe1448a4d03feee809d6b6e32b77ba`);
    const weatherData = await weatherURLResponse.json();
    return weatherData;
  } catch (err) {
    console.log('Opps, we have an error: ', err);
  }
};

// Display location
const dispLocation = (data) => {
  locationName.textContent = data.name;
};

// Display Temperature
const dispTemperature = (data) => {
  temp.textContent = (data.main.temp-272.15).toFixed(1) + String.fromCharCode(176) + "C" ;
};

// Get and display the forecast description and Icon.
const dispIcon_Desc = (data) => {
    forecast.textContent = data.weather[0].description;
    const WeatherIconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    iconImg.src = WeatherIconURL;
};
/*
const dispForecastData = (data) => {
  
};
*/

const searching = async () => {
  try {
    const weatherData = await getFetchData();
    console.log(weatherData);
    
    dispLocation(weatherData);
    dispTemperature(weatherData);
    dispIcon_Desc(weatherData);
    //console.log("Check:" + locationName.hasChildNodes());
    //display temperature, humidity, foreast (icon + describing text).
  } catch (err) {
    console.log('We have an error in our search functionality' + err);
  }
};

button.addEventListener('click', searching);
searchField.addEventListener('keydown', keyDownReturn);