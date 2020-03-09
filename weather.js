const COORDS = "coords";
const API_KEY = "55675b785e85dde23c041cd48be74265";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} ºC  @  ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coordsObj = {
    lat,
    lon
  };
  saveCoords(coordsObj);
  getWeather(lat, lon);
}
function handleGeoError() {
  alert("CANNOT ACESS YOUR GEO_COORDS");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.lat, parsedCoords.lon);
  }
}

function init() {
  loadCoords();
}

init();
