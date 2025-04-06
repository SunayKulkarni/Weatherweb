const apiKey = '274ccff4b8d92e36447a39407d939c6b';

const searchButton = document.querySelector('.search button');
const locationInput = document.querySelector('.search input');
const temperature = document.querySelector('.temp');
const cityName = document.querySelector('.city');
const humidity = document.querySelector('.col:nth-child(1) p:nth-child(2)');
const windSpeed = document.querySelector('.col:nth-child(2) p:nth-child(2)');
const weatherIcon = document.querySelector('.weather-icon');

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
        })
        .catch(error => {
            alert(error.message);
        });
});
