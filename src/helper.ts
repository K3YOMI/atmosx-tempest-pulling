/*
                                            _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                                 
                                     |_|                                                                                                                
    
    Written by: k3yomi@GitHub                        
*/

import * as loader from '../bootstrap';
import mEvents from './events';

export class AtmosXTempestPulling { 
    packages: any;
    metadata: any;
    websocket: any;
    constructor(metadata: any) { 
        this.packages = loader.packages;
        this.metadata = metadata;
        this.websocket = null as any;
        Object.assign(loader.settings, metadata);
        this.errorHandler();
        this.initializeConnection();
    }

    /**
      * @function initializeConnection
      * @description Initializes a WebSocket connection to the WeatherFlow service using the provided API key and device ID.
      * Sets up event listeners for connection open and incoming messages, and handles sending initial subscription messages.
      * Also retrieves station properties if a station ID is provided, and starts listening for weather events.
      */ 

    initializeConnection = () => {
        let stationLat: number = 0;
        let stationLon: number = 0;
        if (!loader.settings.apiKey || !loader.settings.deviceId || !loader.settings.options.websocketUrl) { throw new Error(`invalid-api-key`); }
        const socketUrl = `${loader.settings.options.websocketUrl}?api_key=${loader.settings.apiKey}&location_id=${loader.settings.deviceId}&ver=tempest-20250728`;
        this.websocket = new loader.packages.ws(socketUrl);
        this.websocket.on('open', async () => {
            loader.statics.events.emit(`onConnect`, { type: `WebSocket Connected`, message: `Connected to WeatherFlow WebSocket at ${new Date().toISOString()}` });
            if (loader.settings.stationId) {
                const station = await this.getStationProperties(loader.settings.stationId);
                if (station && typeof station === 'object' && 'stations' in station && Array.isArray(station.stations) && station.stations[0]) {
                    stationLat = station.stations[0].latitude;
                    stationLon = station.stations[0].longitude;
                }
            }
            if (this.websocket) { 
                if (stationLat && stationLon !== 0) {
                    this.websocket.send(JSON.stringify({"type": "geo_strike_listen_start", "lat_min": stationLat - 5,"lat_max": stationLat + 5,"lon_min": stationLon - 5,"lon_max": stationLon + 5,})); 
                }
                this.websocket.send(JSON.stringify({"type": "listen_start", "device_id": loader.settings.deviceId}));
                this.websocket.send(JSON.stringify({"type": "listen_rapid_start", "device_id": loader.settings.deviceId}));
                await this.betterForecast();
            }
        })
        this.websocket.on('message', async (network) => {
            let parsed = JSON.parse(network) as any;
            let type = parsed.type as string;
            if (type == `ack`) { loader.statics.events.emit(`onAck`, { type: `Connection Acknowledged`});}
            if (type == `obs_st`) { mEvents.onObservation(parsed); mEvents.onForecast(await this.betterForecast()); }
            if (type == `rapid_wind`) { mEvents.onRapidWind(parsed); }
            //if (type == `evt_strike`) { mEvents.default(); }
        });
    }

    /**
      * @function betterForecast
      * @description Fetches the latest weather forecast data from the WeatherFlow service for the configured station ID.
      * Returns a promise that resolves with the forecast data or null if forecasts are disabled or an error occurs.
      * Uses the configured API key and station ID to construct the request URL and includes appropriate headers.
      */
    
    betterForecast = async () => {
        return new Promise((resolve, reject) => {
            if (!loader.settings.enableForecasts) { resolve(null); return; }
            if (!loader.settings.stationId) { resolve(null); return; }
            let forecastUrl = `${loader.settings.options.forecastUrl}?api_key=${loader.settings.apiKey}&station_id=${loader.settings.stationId}&units_temp=f&units_wind=mph&units_pressure=inhg&units_distance=mi&units_precip=in&units_other=imperial&units_direction=mph`;
            fetch(forecastUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
            }).then(response => {
                if (!response.ok) { resolve(null); throw new Error(`http-error`); }
                response.json().then(data => { resolve(data); }).catch(err => { resolve(null); });
            })
        })
    }

    /**
      * @function getStationProperties
      * @description Fetches the properties of a weather station from the WeatherFlow service using the provided station ID.
      * Returns a promise that resolves with the station data or null if an error occurs.
      * Uses the configured API key to construct the request URL and includes appropriate headers.
      * 
      * @param {number} stationId - The ID of the weather station to fetch properties for.
      */

    getStationProperties = async (stationId: number) => {
        return new Promise(async (resolve, reject) => {
            let url = `${loader.settings.options.stationLookupUrl}/${stationId}?&api_key=${loader.settings.apiKey}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
            });
            response.json().then(data => { resolve(data);
            }).catch(err => { resolve(null); })
        })
    }

    /**
      * @function getClosestStation
      * @description Fetches the closest weather station to the provided latitude and longitude from the WeatherFlow service.
      * Returns a promise that resolves with the closest station data or null if no stations are found.
      * Uses the configured API key to construct the request URL and includes appropriate headers.
      * 
      * @param {number} latitude - The latitude to search for the closest station.
      * @param {number} longitude - The longitude to search for the closest station.
      */
    
    getClosestStation = async (latitude: number, longitude: number) => {
        return new Promise(async (resolve, reject) => {
            let latMin = latitude - 5, latMax = latitude + 5;
            let lonMin = longitude - 5, lonMax = longitude + 5;
            let url = `${loader.settings.options.closestStationUrl}?&api_key=${loader.settings.apiKey}&build=160&limit=1&lat_min=${latMin}&lon_min=${lonMin}&lat_max=${latMax}&lon_max=${lonMax}&_=${Date.now()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
            });
            const data = await response.json();
            let stations = data.features;
            let closestStation = stations.reduce((closest, station) => {
                let [stationLon, stationLat] = station.geometry.coordinates;
                let distance = Math.sqrt(Math.pow(latitude - stationLat, 2) + Math.pow(longitude - stationLon, 2));
                return !closest || distance < closest.distance ? { station, distance } : closest;
            }, null);
            if (closestStation) {
                resolve({ id: closestStation.station.id, name: closestStation.station.properties.name, distance: closestStation.distance, stations: closestStation.station.properties.devices });
            } else {
                resolve(null);
            }
        })
    }

    /**
      * @function setCoreSettings
      * @description Sets the core settings for the WeatherFlow connection, including device ID and station ID.
      * If the provided IDs are the same as the current settings, the function returns early.
      * Emits an 'onPropertyChange' event with the updated IDs and re-initializes the WebSocket connection.
      * 
      * @param {any} deviceId - The device ID to set.
      * @param {number} stationId - The station ID to set.
      */

    setCoreSettings = (deviceId: any, stationId: number) => {
        if (loader.settings.deviceId === deviceId && loader.settings.stationId === stationId) { return; }
        loader.settings.deviceId = deviceId;
        loader.settings.stationId = stationId;
        loader.statics.events.emit(`onPropertyChange`, { message: `Device ID set to ${deviceId}, Station ID set to ${stationId}` });
        this.initializeConnection();
    }

   /**
     * @function errorHandler
     * @description Sets up a global error handler to catch uncaught exceptions and emit an 'onError' event with the error details.
     * The function checks if the error message matches any predefined halting conditions and includes the corresponding message and code in the emitted event.
     * This helps in logging and handling errors gracefully within the application.
     */

    errorHandler = () => {
        process.on('uncaughtException', (error) => {
            const hault = loader.definitions.haultingConditions.find(e => error.message.includes(e.error));
            if (hault) { loader.statics.events.emit(`onError`, {error: `${hault ? hault.message : error.message}`, code: (hault as any).code }); }
            loader.statics.events.emit(`onError`, { error: error.stack || error.message || `An unknown error occurred`, code: `uncaught-exception` });
        })
    }

    /** 
      * @function onEvent
      * @description Registers an event listener for the specified event and returns a function to remove the listener.
      * 
      * @param {string} event - The name of the event to listen for.
      * @param {function} callback - The callback function to execute when the event is emitted.
      * @returns {function} A function that removes the event listener when called.
      */
        
    onEvent = (event: string, callback: any) => {
        loader.statics.events.on(event, callback);
        return () => { loader.statics.events.off(event, callback); }
    }
}

export default AtmosXTempestPulling;