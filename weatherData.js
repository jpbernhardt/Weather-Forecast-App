const button = document.getElementById("searchBtn");
const searchField = document.querySelector(".searchField");
const containerWin = document.querySelector(".container");
const locationName = document.getElementById("locName");
const forecast = document.getElementById("forecastDesc");
const temp = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const windDir = document.getElementById("windDir");
const iconImg = document.getElementById("weatherIcon");


const getSearchValue = () => {
  const textData = searchField.value;
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

const showContent = () => {
  containerWin.style.display = 'block';
};

const hideContent = () => {
  containerWin.style.display = 'none';
};

// Display location
const dispLocation = (data) => {
  locationName.textContent = data.name;
};

// Function converting degrees to Celius with one decimal.
const convertToCelcius = (degrees) => {
  let Celcius = (degrees-272.15).toFixed(1) + String.fromCharCode(176) + "C";
  return Celcius;
};

// Display Temperature
const dispTemperature = (data) => {
  temp.textContent = convertToCelcius(data.main.temp);
};

// Display Humidity
const dispHumidity = (data) => {
  humidity.textContent = data.main.humidity + "%";
}

// Display Wind Speed
const dispWindSpeed = (data) => {
  windSpeed.textContent = data.wind.speed + "m/s";
}

// Display Wind Direction
const dispWindDir = (data) => {
  windDir.textContent = data.wind.deg + "*";
}

// Get and display the forecast description and Icon.
const dispIcon_Desc = (data) => {
  forecast.textContent = data.weather[0].description;
  feelsLike.textContent = convertToCelcius(data.main.feels_like);
  const WeatherIconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconImg.src = WeatherIconURL;
};

/*
const dispForecastData = (data) => {
  
};
*/

const searching = async () => {
  try {
    if(searchField.value.length === 0) {
      hideContent();
    } else {
      const weatherData = await getFetchData();
      searchField.value = "";
      console.log(weatherData);
      
      dispLocation(weatherData);
      dispTemperature(weatherData);
      dispHumidity(weatherData);
      dispWindSpeed(weatherData);
      dispWindDir(weatherData);
      dispIcon_Desc(weatherData);
      showContent();
      //console.log("Check:" + locationName.hasChildNodes());
      //display temperature, humidity, foreast (icon + describing text).
    }
  } catch (err) {
    console.log('We have an error in our search functionality' + err);
  }
};

button.addEventListener('click', searching);
searchField.addEventListener('keydown', keyDownReturn);