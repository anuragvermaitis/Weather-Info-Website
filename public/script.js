// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMl3Vau9rEzFsiZGnXDbNHG7UnChN4fbc",
    authDomain: "weather-app-7b0a8.firebaseapp.com",
    projectId: "weather-app-7b0a8",
    storageBucket: "weather-app-7b0a8.appspot.com",
    messagingSenderId: "701228850958",
    appId: "1:701228850958:web:ad21b69b19a698d455c15f",
    measurementId: "G-7P97YNVWQ5"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);

function options() {
    const cityInput = document.querySelector("#city input");

    const city = cityInput.value;
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '71c8f56ccamshf9b5f9cfec279f0p1160a5jsn3228254e3ad5',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("cloud").innerHTML = "Cloud percentage: " + data.cloud_pct + "%";
            document.getElementById("feels").innerHTML = "Feels like: " + data.feels_like + "°C";
            document.getElementById("humidity").innerHTML = "Humidity: " + data.humidity + "%";
            document.getElementById("sunrise").innerHTML = "Sunrise: " + new Date(data.sunrise * 1000).toLocaleTimeString();
            document.getElementById("sunset").innerHTML = "Sunset: " + new Date(data.sunset * 1000).toLocaleTimeString();
            document.getElementById("temp").innerHTML = "Temperature: " + data.temp + "°C";
            document.getElementById("degrees").innerHTML = "Wind Degrees: " + data.wind_degrees + "°";
            document.getElementById("speed").innerHTML = "Wind Speed: " + data.wind_speed;
        })
        .catch(err => console.error('Error:', err));
}
