# AtmosphericX - Tempest Weather Station Pulling Service

This repository provides a robust solution for interacting with the [Tempest Weather Station](https://shop.tempest.earth/products/tempest). It enables seamless data retrieval using the device ID, including identifying the nearest station ID. With this project, you can access a wide range of weather related data such as temperature, humidity, pressure, wind gusts, and more.

If you prefer a no-code approach, check out our comprehensive project, [AtmosphericX](https://github.com/k3yomi/AtmosphericX), which leverages this codebase to deliver an intuitive and user friendly experience for weather data analysis and visualization.

## Installation Guide
To install this package, you can use **NPM** (Node Package Manager). Open your terminal and run the following command:

```bash
npm install atmosx-tempest-pulling
```

## Usage
```js
const AtmosXTempestPulling = require(`atmosx-tempest-pulling`);
```

## Configuration and Initialization

There are several settings you can configure when intializing this package. Please keep in mind that you must provide your own API key which can be obtained [here](https://apidocs.tempestwx.com/reference/quick-start).

```js
let Client = new AtmosXTempestPulling({
    apiKey: `YOUR-API-KEY-HERE`, // Your Tempest API key
    deviceId: 0, // Your Tempest device ID
    stationId: 0, // Your Tempest station ID (optional)
    enableForecasts: true, // Enable forecasts (Area)
});
```


## Event Handling

You can handle various events emitted by the package. Here are some examples:

```js
Client.onEvent(`onAck`, (event: Object) => {});
Client.onEvent(`onObservation`, (event: Object) => {});
Client.onEvent(`onWind`, (event: Object) => {});
Client.onEvent(`onForecast`, (event: Object) => {});
Client.onEvent(`onLightning`, (event: Object) => {});
Client.onEvent(`onError`, (event: Object) => {});
Client.onEvent(`onPropertyChange`, (property: Object) => {});
```

## Functions and Methods
You can also use various functions provided by the package. Here are some examples:
```js
// Get the closest station based on the latitude and longitude (Returns object with station ID, name, and distance)
Client.getClosestStation(lat: Number, lon: Number); // Will return null if no station is found
```

```js
// Set the device ID for the package
Client.setDeviceId(deviceId: Number);
```

```js
// Set the station ID for the package
Client.setStationId(stationId: Number);
```


## Error Handling
The parser can emit various errors. Here are some common errors you might encounter:

**missing-api-or-device-id**: This error indicates that either the API key or the device ID is missing. Ensure that you have provided both in the configuration.

**http-error**: This error occurs when there is an issue with the HTTP request, such as a network error or an invalid response from the server. Check your internet connection and ensure that the API endpoint is reachable.


## Credits
This parser is developed and maintained by [K3YOMI](https://github.com/K3YOMI) and the AtmosphericX Team. It is open-source and available for contributions and improvements. If you find any issues or have suggestions, feel free to open an issue or submit a pull request in the repository.
