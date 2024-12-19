const apiKey = '274ccff4b8d92e36447a39407d939c6b'; // Replace with your OpenWeatherMap API key

// Select DOM elements
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('cityName');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const city = locationInput.value.trim();

    if (!city) {
        alert('Please enter a location');
        return;
    }

    // Fetch weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Update the UI with fetched data
            temperature.textContent = `${data.main.temp}°C`;
            cityName.textContent = data.name;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} km/h`;

            // Update weather icon based on API's weather condition icon
            const iconCode = data.weather[0].icon; // e.g., "10d"
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        })
        .catch(error => {
            alert(error.message);
        });
});
