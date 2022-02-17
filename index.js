var element = document.getElementById("geo-position");
var timesElement = document.getElementById("times");

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
        timesElement.innerHTML = JSON.stringify(await data.json())
    } catch (error) {
        alert('Could not get times.')
    }
}