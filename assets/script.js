
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

        fetchFutureWeatherData(city);
     
    }
    
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
      var recentSearchesElement = document.querySelector('.recentSearch');
      recentSearchesElement.innerHTML = '';
  
      recentSearches.forEach(function (search) {
        var searchItem = document.createElement('p');
        searchItem.textContent = search;
        recentSearchesElement.appendChild(searchItem);
      });
    }

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
              var forecastData = data.list.splice(0,5); // Array of forecast entries
      
              var forecastContainer = document.querySelector('.forecast-container');
              forecastContainer.innerHTML = ''; // Clear existing forecast cards

              
              forecastData.forEach(function (forecastEntry) {
                var temperature = forecastEntry.main.temp;
                var windSpeed = forecastEntry.wind.speed;
                var humidity = forecastEntry.main.humidity;
                var date = new Date(forecastEntry.dt * 1000);
      
                var card = document.createElement('div');
                card.classList.add('col-2');
      
                var cardContent = document.createElement('div');
                cardContent.classList.add('card', 'bg-dark', 'text-light');
      
                var futureWeather = document.createElement('div');
                futureWeather.classList.add('futureWeather');
      
                var temperatureElement = document.createElement('h3');
                temperatureElement.classList.add('nextTemp');
                temperatureElement.textContent = temperature + '°F';
                futureWeather.appendChild(temperatureElement);
      
                var imageElement = document.createElement('img');
                imageElement.src = `https://openweathermap.org/img/w/${forecastEntry.weather[0].icon}.png`;
                futureWeather.appendChild(imageElement);
      
                var cardText = document.createElement('div');
                cardText.classList.add('card-text');
      
                var windElement = document.createElement('p');
                windElement.id = 'nextDayWind';
                windElement.textContent = 'Wind: ' + windSpeed + ' mph';
                cardText.appendChild(windElement);
      
                var humidityElement = document.createElement('p');
                humidityElement.id = 'nextDayHumidity';
                humidityElement.textContent = 'Humidity: ' + humidity + '%';
                cardText.appendChild(humidityElement);
      
                var dateElement = document.createElement('p');
                dateElement.id = 'nextDayDate';
                dateElement.textContent = date.toLocaleDateString();
                cardText.appendChild(dateElement);
      
                futureWeather.appendChild(cardText);
      
                cardContent.appendChild(futureWeather);
                cardContent.appendChild(createCardFooter());
      
                card.appendChild(cardContent);
                forecastContainer.appendChild(card);

                logRecentSearch(data.name);
              });
            }
            )
            .catch(function (error) {
              console.log('Error:', error);
            });
        }
      
        function createCardFooter() {
          var cardFooter = document.createElement('div');
          cardFooter.classList.add('card-footer');
      
          var smallElement = document.createElement('small');
          smallElement.classList.add('text-body-secondary');
          smallElement.textContent = 'Last updated 3 mins ago';
      
          cardFooter.appendChild(smallElement);
      
          return cardFooter;
        }

        loadRecentSearches();
         
});
