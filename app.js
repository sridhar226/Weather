const weatherForm =document.querySelector("form");
const cityinput= document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey ="8b0e0fab96e9adb87ba829d4cdb09bf6";

weatherForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const weatherData =await getweatherData(city);
            displayWeatherinfo(weatherData)
        }
        catch(error){
            console.log(error)
            displayError(error)
        }
    }
    else{
        displayError("Please enter a City Name")
    }
});

async function getweatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    console.log(response)

    if(!response.ok){
        throw new Error("Could Not fetch Weather Data")
    }
    return await response.json();

}

function displayWeatherinfo(data){
    const {name:city, main:{temp,humidity}, weather:[{description,id}]} = data;


    card.textContent =""
    card.style.display ="flex"

    const cityDisplay = document.createElement("h1")
    const tempDisply = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")


    cityDisplay.textContent =city;
    tempDisply.textContent =`${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent =`Humidity ${humidity}`;
    descDisplay.textContent =description;
    weatherEmoji.textContent =getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay")
    tempDisply.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")


    card.appendChild(cityDisplay)
    card.appendChild(tempDisply)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherid) {
    switch(true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈"; // Thunderstorm
        case (weatherid >= 300 && weatherid < 400):
            return "🌧"; // Drizzle
        case (weatherid >= 500 && weatherid < 600):
            return "🌧"; // Rain
        case (weatherid >= 600 && weatherid < 700):
            return "❄"; // Snow
        case (weatherid >= 700 && weatherid < 800):
            return "🌫"; // Atmosphere
        case (weatherid === 800):
            return "🌕"; // Clear
        case (weatherid >= 801 && weatherid < 810):
            return "🌥"; // Clouds

        default:
            return "❓"; // Unknown
    }
}



function displayError(message){
    const errorDisplay =document.createElement("p");
    errorDisplay.textContent =message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent ="";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}