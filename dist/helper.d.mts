declare class AtmosXTempestPulling {
    packages: any;
    metadata: any;
    websocket: any;
    constructor(metadata: any);
    /**
      * @function initializeConnection
      * @description Initializes a WebSocket connection to the WeatherFlow service using the provided API key and device ID.
      * Sets up event listeners for connection open and incoming messages, and handles sending initial subscription messages.
      * Also retrieves station properties if a station ID is provided, and starts listening for weather events.
      */
    initializeConnection: () => void;
    /**
      * @function betterForecast
      * @description Fetches the latest weather forecast data from the WeatherFlow service for the configured station ID.
      * Returns a promise that resolves with the forecast data or null if forecasts are disabled or an error occurs.
      * Uses the configured API key and station ID to construct the request URL and includes appropriate headers.
      */
    betterForecast: () => Promise<unknown>;
    /**
      * @function getStationProperties
      * @description Fetches the properties of a weather station from the WeatherFlow service using the provided station ID.
      * Returns a promise that resolves with the station data or null if an error occurs.
      * Uses the configured API key to construct the request URL and includes appropriate headers.
      *
      * @param {number} stationId - The ID of the weather station to fetch properties for.
      */
    getStationProperties: (stationId: number) => Promise<unknown>;
    /**
      * @function getClosestStation
      * @description Fetches the closest weather station to the provided latitude and longitude from the WeatherFlow service.
      * Returns a promise that resolves with the closest station data or null if no stations are found.
      * Uses the configured API key to construct the request URL and includes appropriate headers.
      *
      * @param {number} latitude - The latitude to search for the closest station.
      * @param {number} longitude - The longitude to search for the closest station.
      */
    getClosestStation: (latitude: number, longitude: number) => Promise<unknown>;
    /**
      * @function setCoreSettings
      * @description Sets the core settings for the WeatherFlow connection, including device ID and station ID.
      * If the provided IDs are the same as the current settings, the function returns early.
      * Emits an 'onPropertyChange' event with the updated IDs and re-initializes the WebSocket connection.
      *
      * @param {any} deviceId - The device ID to set.
      * @param {number} stationId - The station ID to set.
      */
    setCoreSettings: (deviceId: any, stationId: number) => void;
    /**
      * @function errorHandler
      * @description Sets up a global error handler to catch uncaught exceptions and emit an 'onError' event with the error details.
      * The function checks if the error message matches any predefined halting conditions and includes the corresponding message and code in the emitted event.
      * This helps in logging and handling errors gracefully within the application.
      */
    errorHandler: () => void;
    /**
      * @function onEvent
      * @description Registers an event listener for the specified event and returns a function to remove the listener.
      *
      * @param {string} event - The name of the event to listen for.
      * @param {function} callback - The callback function to execute when the event is emitted.
      * @returns {function} A function that removes the event listener when called.
      */
    onEvent: (event: string, callback: any) => () => void;
}

export { AtmosXTempestPulling, AtmosXTempestPulling as default };
