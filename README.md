<h1 align="center">Get My Current Weather</h1>

<p align="center">
<img src="https://cdn-icons-png.flaticon.com/512/979/979585.png" alt="Logo" width="25%" height="25%">
</p>

<p align="center"><a href="https://get-my-current-weather.netlify.app/">LINK TO THE PAGE</a></p>

<h2 align="center">Technologies Used</h2>

The project comprises a full-stack application displaying a current weather for the chosen place. It was created by using **React.js** for the frontend and **Express.js** for the backend.

<h2 align="center">User Functionalities</h2>

The application comprises of two core functionalities: _fetching your current location_ and _displaying the weather for the entered city_. Before any API call is made, by default, the application displays my very own definition of perfect weather for an imaginary city _Dreamland_.

<h3 align="center">Get my current location</h3>

The current location functionality works in the following way:

1. First, a geolocation API is used to get your geographical coordinates (latitude and longitude) based on the location of your browser.
2. Then, the geolocation data is sent to the backend, which uses a Google Maps reversed geocoding API to return the city name based on the coordinates.
3. Finally, the city name is sent back to you.

**Important note:** because of a considerable latency of the free Google Maps API, getting your current location can take up to several seconds.

<h3 align="center">Display chosen city</h3>

You can click on the magnifying glass icon to display the weather either for your current location (if you used the current location function described above) or for an entered city name of your choice. Afterwards, you receive the following info for your chosen spot:

- current local time,
- temperature,
- general weather condition,
- wind, humidity, pressure, perceived temperature,
- sunrise & sunset.

Additionally, the current weather is illustrated by an image. There a different images for the following weather phenomena:

- clear sky (if the sky is clear, a moon picture is displayed instead of the sun at night),
- clouds,
- rain,
- snow,
- haze,
- fog,
- thunderstorm,
- tornado,
- smoke,
- dust/sand/ash.

<h2 align="center">Project Installation</h2>

To install the project, enter _/frontend_ and _/backend_, and run _npm install_ in each of the directories.
