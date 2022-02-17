const element = document.getElementById("geo-position");
const timesElement = document.getElementById("times");

async function getLocation() {
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            element.innerHTML = `Latitude:  ${latitude} <br>Longitude: ${longitude}`;
            await getTimes(latitude, longitude)
        });

    } else {
        element.innerHTML = "Geolocation is not supported by this browser.";
    }
}


async function getTimes(lat, lng) {
    try {
        const data = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`)
        const { sunrise, sunset } = (await data.json()).results;

        const sunRise = document.getElementById("sun-rise");
        const sunSet = document.getElementById("sun-set");
        sunRise.innerHTML = `Sunrise : ${sunrise}`;
        sunSet.innerHTML = `Sunset : ${sunset}`;

    } catch (error) {
        alert('Could not get times.')
    }
}

window.onload = () => {
    getLocation()
}