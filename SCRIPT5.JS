document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const weatherInfo = document.getElementById('weatherInfo');
    const locationForm = document.getElementById('locationForm');
    const locationInput = document.getElementById('locationInput');
    const currentLocationButton = document.getElementById('currentLocationButton');
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');

    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const location = locationInput.value;
        fetchWeatherData(location);
    });

    currentLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(null, latitude, longitude);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    async function fetchWeatherData(location, latitude = null, longitude = null) {
        let url;
        if (location) {
            url = https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey};
        } else if (latitude && longitude) {
            url = https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey};
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayWeatherData(data) {
        locationName.textContent = data.name;
        temperature.textContent = data.main.temp;
        conditions.textContent = data.weather[0].description;
        weatherInfo.classList.remove('hidden');
    }
});