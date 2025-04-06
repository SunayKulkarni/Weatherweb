document.addEventListener("DOMContentLoaded", () => {
  const apiKey = '274ccff4b8d92e36447a39407d939c6b';

  const searchButton = document.getElementById('searchButton');
  const locationInput = document.getElementById('locationInput');
  const temperature = document.getElementById('temperature');
  const cityName = document.getElementById('cityName');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');
  const weatherIcon = document.getElementById('weatherIcon');

  searchButton.addEventListener('click', () => {
    const city = locationInput.value.trim();

    if (!city) {
      alert('Please enter a location');
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        temperature.textContent = `${data.main.temp}°C`;
        cityName.textContent = data.name;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
      })
      .catch(error => {
        alert(error.message);
      });
  });
});

locationInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

