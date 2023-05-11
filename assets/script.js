

const apiKey = "3d10b270100701ab93bcc7db3d85dd79";
const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.getElementById("#search input");
const searchBtn = document.getElementById("#search button");

async function getWeather() {
  const response = await fetch(url + city + "&appid=" + apiKey);
  const data = await response.json();
  console.log(data);
}



document.getElementById("#city").innerHTML = data.name;
document.getElementById("#temp").innerHTML = data.main.temp + "°F";
document.getElementById("#humidity").innerHTML = data.main.humidity + "%";
document.getElementById("#wind").innerHTML = data.wind.speed + "mph";

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});