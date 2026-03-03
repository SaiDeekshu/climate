"use strict";
const apiKey = "0df765200bf2be3879b079d7e67e1da9"; // replace with OpenWeatherMap API key
// helpers to select elements with type casting
function $(selector) {
    const el = document.querySelector(selector);
    if (!el) {
        throw new Error(`Element not found: ${selector}`);
    }
    return el;
}
const cityInput = $("#city-input");
const fetchBtn = $("#fetch-btn");
const loadingText = $("#loading");
const resultDiv = $("#result");
const errorText = $("#error");
const cityNameEl = $("#city-name");
const tempEl = $("#temp");
const descEl = $("#description");
const iconEl = $("#icon");
fetchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
    else {
        showError("Please enter a city name.");
    }
});
// allow pressing Enter in input to trigger search
cityInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        fetchBtn.click();
    }
});
async function fetchWeather(city) {
    errorText.classList.add("hidden");
    resultDiv.classList.add("hidden");
    loadingText.classList.remove("hidden");
    fetchBtn.setAttribute("disabled", "true");
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) {
            // try to parse error message from API
            let msg = "City not found";
            try {
                const errData = await res.json();
                if (errData && errData.message) {
                    msg = errData.message;
                }
            }
            catch (_a) { }
            throw new Error(msg);
        }
        const data = await res.json();
        displayWeather(data);
    }
    catch (err) {
        showError(err.message || "Unable to fetch data");
    }
    finally {
        loadingText.classList.add("hidden");
        fetchBtn.removeAttribute("disabled");
    }
}
function displayWeather(data) {
    cityNameEl.textContent = data.name;
    tempEl.textContent = `${data.main.temp.toFixed(1)} °C`;
    descEl.textContent = data.weather[0].description;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    resultDiv.classList.remove("hidden");
}
function showError(msg) {
    errorText.textContent = msg;
    errorText.classList.remove("hidden");
}
