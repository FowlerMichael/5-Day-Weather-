
  //apiKey: "3d10b270100701ab93bcc7db3d85dd79"
  document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.querySelector('.btn-primary');
  
    searchButton.addEventListener('click', function () {
      var cityInput = document.querySelector('.form-control').value;
      fetchWeatherData(cityInput);
    });
  
    function fetchWeatherData(city) {
      var apiKey = "3d10b270100701ab93bcc7db3d85dd79";
      var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
      fetch(apiUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.status);
          }
        })
        .then(function (data) {
          var temperature = data.main.temp;
          var windSpeed = data.wind.speed;
          var humidity = data.main.humidity;
          var date = new Date(data.dt * 1000);
          var icon = data.weather[0].icon;
  
          var tempElement = document.querySelector('.temp');
          tempElement.textContent = temperature + '°F';
  
          var cityElement = document.querySelector('.city');
          cityElement.textContent = data.name;
  
          var windElement = document.getElementById('wind');
          windElement.textContent = 'Wind: ' + windSpeed + ' mph ';
  
          var humidityElement = document.getElementById('Humidity');
          humidityElement.textContent = 'Humidity: ' + humidity + '%';

          var dateElement = document.getElementById('date');
          dateElement.textContent = date.toLocaleDateString();
    
          logRecentSearch(data.name);
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    
  
  
  
    function logRecentSearch(city) {
      var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      recentSearches.unshift(city);
  
      if (recentSearches.length > 5) {
        recentSearches = recentSearches.slice(0, 5);
      }
  
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  
      loadRecentSearches();
    }
  
    function loadRecentSearches() {
      var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      var recentSearchesElement = document.querySelector('.Reascent .card-text');
      recentSearchesElement.innerHTML = '';
  
      recentSearches.forEach(function (search) {
        var searchItem = document.createElement('p');
        searchItem.textContent = search;
        recentSearchesElement.appendChild(searchItem);
      });
    }
    fetchFutureWeatherData();
    function fetchFutureWeatherData(city) {
      var apiKey = "3d10b270100701ab93bcc7db3d85dd79";
      var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
      fetch(apiUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.status);
          }
        })
        .then(function (data) {
          var temperature = data.main.temp;
          var windSpeed = data.wind.speed;
          var humidity = data.main.humidity;
          var date = new Date(data.dt * 1000);
  
          var tempElement = document.querySelector('.nextDayTemp');
          tempElement.textContent = temperature + '°F';
  
          var cityElement = document.querySelector('.city');
          cityElement.textContent = data.name;
  
          var windElement = document.getElementById('nextDayWind');
          windElement.textContent = 'Wind: ' + windSpeed + ' m/s';
  
          var humidityElement = document.getElementById('nextDayHumidity');
          humidityElement.textContent = 'Humidity: ' + humidity + '%';

          var dateElement = document.getElementById('nextDayDate');
          dateElement.textContent = date.toLocaleDateString();

        });
    }
    


  
    loadRecentSearches();
  };
  });
