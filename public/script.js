const apiKey = 'feca8a6f51msh325820532a99432p1ba490jsn53e11577841f';
const apiHost = 'weatherbit-v1-mashape.p.rapidapi.com';

async function getWeather(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        updateUI(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

function getCityWeather() {
    const cityInput = document.querySelector("#city input");
    const city = cityInput.value;
    const units = document.getElementById('units').value;
    const url = `https://${apiHost}/current?city=${city}&units=${units}`;
    getWeather(url);
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const units = document.getElementById('units').value;
            const url = `https://${apiHost}/current?lat=${lat}&lon=${lon}&units=${units}`;
            getWeather(url);
        }, () => {
            console.error('Geolocation is not supported by this browser.');
        });
    }
}

function updateUnit() {
    const cityInput = document.querySelector("#city input");
    if (cityInput.value) {
        getCityWeather();
    } else {
        getLocationWeather();
    }
}

function updateUI(data) {
    const weather = data.data[0];
    document.getElementById("city-name").innerHTML = `City: ${weather.city_name}`;
    document.getElementById("cloud").innerHTML = `Cloud percentage: ${weather.clouds}%`;
    document.getElementById("feels").innerHTML = `Feels like: ${weather.app_temp}°`;
    document.getElementById("humidity").innerHTML = `Humidity: ${weather.rh}%`;
    document.getElementById("temp").innerHTML = `Temperature: ${weather.temp}°`;
    document.getElementById("degrees").innerHTML = `Wind Degrees: ${weather.wind_dir}°`;
    document.getElementById("speed").innerHTML = `Wind Speed: ${weather.wind_spd} m/s`;
    document.getElementById("aqi").innerHTML = `AQI: ${weather.aqi}`;
}
