

async function getWeather() {
    try {
        const typedCity =  document.getElementById("city-input").value;
                if (typedCity === "") {
            alert("Please type a city name!");
            return;
        }

 const geoAPI = `https://geocoding-api.open-meteo.com/v1/search?name=${typedCity}&count=1`;

                const geoResponse = await fetch(geoAPI);
        const geoData = await geoResponse.json();

                  if (!geoData.results) {
            alert("City not found! Try another name.");
            return; 
        }

         const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const officialName = geoData.results[0].name;
 const WeatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m,rain`;



       const response = await fetch(WeatherAPI);
        const data = await response.json();
        console.log("Weather Data:", data); // Check the console to see the results!

        // 4. Update the screen
        document.getElementById('city-name').innerText = officialName;
        document.getElementById('temp').innerText = data.hourly.temperature_2m[0];
        document.getElementById('wind').innerText = data.hourly.wind_speed_10m[0];
        document.getElementById('rain').innerText = data.hourly.rain[0];
        document.getElementById('rain').innerText =  data.hourly.rain[0];
    }
    
    catch (error) {
          console.error("Error fetching the weather data:", error);
    }
}