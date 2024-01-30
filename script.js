const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#search-btn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');

async function checkWeather(city) {
    // whether API
    const api_key = '41856ef3cef176d4adfd82e4114784de';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weatherData = await fetch(`${url}`).then(response => response.json()).catch(error => console.log(error))

    if (weatherData.cod === '404') {

        document.querySelector('.location-not-found').style.display = "flex";
        document.querySelector('.weather-body').style.display = "none"

    } else if(inputBox.value == ''){

        document.querySelector('.location-not-found').style.display = "flex";
        document.querySelector('.weather-body').style.display = "none";

    } else {

        document.querySelector('.weather-body').style.display = "flex"
        document.querySelector('.location-not-found').style.display = "none";

        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}<sup>°C</sup>`;
        description.innerHTML = `${weatherData.weather[0].description}`
        humidity.innerHTML = `${weatherData.main.humidity}%`
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = `./assets/cloud.png`;
                break;
            case 'Clear':
                weatherImg.src = `./assets/clear.png`;
                break;
            case 'Rain':
                weatherImg.src = `./assets/rain.png`;
                break;
            case 'Mist':
                weatherImg.src = `./assets/mist.png`;
                break;
            case 'Snow':
                weatherImg.src = `./assets/snow.png`;
                break;
            case 'Smoke':
                weatherImg.src = `./assets/smoke.png`;
                break;
        }
        
    }


}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value)
})