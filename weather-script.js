// API Keys
const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Get from https://openweathermap.org/api
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';

// State
let currentWeather = null;
let forecast = null;
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const errorMsg = document.getElementById('errorMsg');
const loading = document.getElementById('loading');
const mainContent = document.getElementById('mainContent');
const suggestions = document.getElementById('suggestions');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateFavorites();
    // Load default city on startup
    searchWeatherByCity('London');
});

// Search for weather
function searchWeather() {
    const city = searchInput.value.trim();
    if (city) {
        searchWeatherByCity(city);
        searchInput.value = '';
        suggestions.classList.remove('show');
    }
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        loading.classList.remove('hidden');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                showError('Unable to get your location. Please check permissions.');
                loading.classList.add('hidden');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Search weather by city name
async function searchWeatherByCity(city) {
    loading.classList.remove('hidden');
    clearError();
    
    try {
        // Get coordinates from city name
        const geoResponse = await fetch(
            `${GEO_API_URL}/direct?q=${city}&limit=5&appid=${OPENWEATHER_API_KEY}`
        );
        
        if (!geoResponse.ok) throw new Error('City not found');
        
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            showError('City not found. Please try another search.');
            loading.classList.add('hidden');
            return;
        }
        
        // Get weather for first result
        const { lat, lon } = geoData[0];
        getWeatherByCoords(lat, lon);
    } catch (error) {
        showError(error.message);
        loading.classList.add('hidden');
    }
}

// Get weather by coordinates
async function getWeatherByCoords(lat, lon) {
    loading.classList.remove('hidden');
    clearError();
    
    try {
        // Current weather
        const weatherResponse = await fetch(
            `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
        
        currentWeather = await weatherResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `${OPENWEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        
        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
        
        forecast = await forecastResponse.json();
        
        // Display data
        displayCurrentWeather();
        displayForecast();
        displayHourlyForecast();
        displaySunInfo();
        
        mainContent.classList.remove('hidden');
        loading.classList.add('hidden');
    } catch (error) {
        showError(error.message);
        loading.classList.add('hidden');
    }
}

// Display current weather
function displayCurrentWeather() {
    const { main, weather, wind, clouds, visibility, sys } = currentWeather;
    const description = weather[0].description;
    const icon = getWeatherIcon(weather[0].main);
    
    document.getElementById('cityName').textContent = `${currentWeather.name}, ${currentWeather.sys.country}`;
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('weatherIcon').innerHTML = icon;
    
    document.getElementById('humidity').textContent = `${main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(wind.speed * 3.6)} km/h`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${main.pressure} mb`;
    document.getElementById('feelsLike').textContent = `${Math.round(main.feels_like)}°C`;
    document.getElementById('uvIndex').textContent = `${clouds.all}%`;
}

// Display 5-day forecast
function displayForecast() {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    const dailyForecasts = {};
    
    forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                date,
                temps: [],
                icon: getWeatherIcon(item.weather[0].main),
                description: item.weather[0].description
            };
        }
        
        dailyForecasts[date].temps.push(item.main.temp);
    });
    
    Object.values(dailyForecasts).slice(0, 5).forEach(day => {
        const minTemp = Math.round(Math.min(...day.temps));
        const maxTemp = Math.round(Math.max(...day.temps));
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div class="forecast-icon">${day.icon}</div>
            <div class="forecast-temp">${maxTemp}°</div>
            <div class="forecast-minmax">${minTemp}° / ${maxTemp}°</div>
        `;
        forecastContainer.appendChild(card);
    });
}

// Display hourly forecast
function displayHourlyForecast() {
    const hourlyContainer = document.getElementById('hourlyContainer');
    hourlyContainer.innerHTML = '';
    
    forecast.list.slice(0, 8).forEach(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const temp = Math.round(item.main.temp);
        const icon = getWeatherIcon(item.weather[0].main);
        
        const card = document.createElement('div');
        card.className = 'hourly-card';
        card.innerHTML = `
            <div class="hourly-time">${time}</div>
            <div class="hourly-icon">${icon}</div>
            <div class="hourly-temp">${temp}°C</div>
        `;
        hourlyContainer.appendChild(card);
    });
}

// Display sun info
function displaySunInfo() {
    const sunrise = new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const sunset = new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
}

// Get weather icon emoji
function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '🌋',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    
    return icons[weatherMain] || '🌤️';
}

// Show error message
function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
}

// Clear error message
function clearError() {
    errorMsg.classList.remove('show');
    errorMsg.textContent = '';
}

// Add to favorites
function addFavorite() {
    if (!currentWeather) return;
    
    const city = {
        name: currentWeather.name,
        country: currentWeather.sys.country,
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon
    };
    
    const exists = favorites.some(fav => 
        fav.name === city.name && fav.country === city.country
    );
    
    if (!exists) {
        favorites.push(city);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        updateFavorites();
        showError(`${city.name} added to favorites!`);
    } else {
        showError(`${city.name} is already in favorites!`);
    }
}

// Remove favorite
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    updateFavorites();
}

// Update favorites display
function updateFavorites() {
    const container = document.getElementById('favoritesContainer');
    container.innerHTML = '';
    
    favorites.forEach((city, index) => {
        const btn = document.createElement('button');
        btn.className = 'favorite-btn';
        btn.innerHTML = `
            <div>${city.name}, ${city.country}</div>
            <div class="favorite-remove" onclick="removeFavorite(${index}); event.stopPropagation();">✕ Remove</div>
        `;
        btn.onclick = () => getWeatherByCoords(city.lat, city.lon);
        container.appendChild(btn);
    });
}

// Search suggestions
searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        suggestions.classList.remove('show');
        return;
    }
    
    try {
        const response = await fetch(
            `${GEO_API_URL}/direct?q=${query}&limit=5&appid=${OPENWEATHER_API_KEY}`
        );
        
        const data = await response.json();
        
        if (data.length > 0) {
            suggestions.innerHTML = '';
            data.forEach(city => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.textContent = `${city.name}, ${city.country}`;
                item.onclick = () => {
                    searchInput.value = '';
                    suggestions.classList.remove('show');
                    getWeatherByCoords(city.lat, city.lon);
                };
                suggestions.appendChild(item);
            });
            suggestions.classList.add('show');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
});

// Enter key search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Close suggestions on outside click
document.addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        suggestions.classList.remove('show');
    }
});
