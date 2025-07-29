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

let loader = require(`./bootstrap.js`);

class TempestCore { 
    constructor(metadata={}) {
        this.packages = loader.packages;
        this.station = []
        loader.settings = { ...loader.settings, ...metadata };
        process.on('uncaughtException', (error) => {
            const hault = loader.definitions.haultingConditions.find(e => error.message.includes(e.error));
            if (hault) { loader.static.events.emit(`onError`, {error: `${hault ? hault.message : error.message}`, code: hault.code}); return; }
            loader.static.events.emit(`onError`, { error: error.stack || error.message || `An unknown error occurred`, code: `uncaught-exception` });
        });
        this.initalizeConnection();
    }

    /**
      * @function setStationId
      * @description Sets the station ID for the client.
      * 
      * @param {number} stationId - The ID of the station to set.
      */ 

    setStationId = function(stationId) {
        if (loader.settings.stationId === stationId) { return; }
        loader.settings.stationId = stationId;
        loader.static.events.emit(`onPropertyChange`, { message: `Station ID set to ${stationId}` });
    }

    /**
      * @function setDeviceId
      * @description Sets the device ID for the client.
      * 
      * @param {number} deviceId - The ID of the device to set.
      */

    setDeviceId = function(deviceId) {
        if (loader.settings.deviceId === deviceId) { return; }
        loader.settings.deviceId = deviceId;
        if (this.websocket && this.websocket.readyState === this.websocket.OPEN) { this.websocket.close(); }
        loader.static.events.emit(`onPropertyChange`, { message: `Device ID set to ${deviceId}` });
        this.initalizeConnection();
    }

    /**
      * @function getClosestStation
      * @description Fetches the closest weather station based on latitude and longitude.
      *
      * @param {number} lat - The latitude of the location.
      * @param {number} lon - The longitude of the location.
      */

    getClosestStation = function(lat, lon) { 
        return new Promise(async (resolve, reject) => {
            let latMin = lat - 5, latMax = lat + 5;
            let lonMin = lon - 5, lonMax = lon + 5;
            let url = `${loader.settings.options.closestStationUrl}?&api_key=${loader.settings.apiKey}&build=160&limit=1&lat_min=${latMin}&lon_min=${lonMin}&lat_max=${latMax}&lon_max=${lonMax}&_=${Date.now()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
            });
            const data = await response.json();
            let stations = data.features;
            let closestStation = stations.reduce((closest, station) => {
                let [stationLon, stationLat] = station.geometry.coordinates;
                let distance = Math.sqrt(Math.pow(lat - stationLat, 2) + Math.pow(lon - stationLon, 2));
                return !closest || distance < closest.distance ? { station, distance } : closest;
            }, null);
            if (closestStation) {
                resolve({ id: closestStation.station.id, name: closestStation.station.properties.name, distance: closestStation.distance, stations: closestStation.station.properties.devices });
            } else {
                resolve(null)
            }
        })
    }

    getStationProperties = function(stationId) {
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
      * @function betterForecast
      * @description Fetches the forecast data for the configured station. 
      */

    betterForecast = function() {
        return new Promise((resolve, reject) => {
            if (!loader.settings.enableForecasts) { resolve(null); return; }
            if (loader.cache.lastForecast && (Date.now() - loader.cache.lastForecast) < (loader.cache.nextRefresh * 1000)) {
                resolve(null); return;
            }
            loader.cache.lastForecast = Date.now();
            if (!loader.settings.stationId) { resolve(null); return; }
            let forecastUrl = `${loader.settings.options.forecastUrl}?api_key=${loader.settings.apiKey}&station_id=${loader.settings.stationId}&units_temp=f&units_wind=mph&units_pressure=inhg&units_distance=mi&units_precip=in&units_other=imperial&units_direction=mph`;
            fetch(forecastUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
            }).then(response => {
                if (!response.ok) { resolve(null); throw new Error(`http-error`); }
                response.json().then(data => { resolve(data); }).catch(err => { resolve(null); })
            })
        })
    }

    /**
      * @function initalizeConnection
      * @description Initializes the WebSocket connection...
      */

    initalizeConnection = function() {
        if (!loader.settings.apiKey || !loader.settings.deviceId || !loader.settings.options.websocketUrl ) { throw new Error("missing-api-or-device-id"); }
        let websocketUrl = `${loader.settings.options.websocketUrl}?api_key=${loader.settings.apiKey}&location_id=${loader.settings.deviceId}&ver=tempest-20250728`;
        this.websocket = new loader.packages.ws(websocketUrl);
        this.websocket.on('open', async () => {
            loader.static.events.emit(`onConnect`, { message: `Connected to ${loader.settings.websocketUrl}`});
            if (loader.settings.stationId) {
                let station = await this.getStationProperties(loader.settings.stationId);
                let stationLat = station.stations[0].latitude;
                let stationLon = station.stations[0].longitude;
                this.websocket.send(JSON.stringify({"type": "geo_strike_listen_start", "lat_min": stationLat - 5,"lat_max": stationLat + 5,"lon_min": stationLon - 5,"lon_max": stationLon + 5,}));
            }
            this.websocket.send(JSON.stringify({"type": "listen_start", "device_id": loader.settings.deviceId}));
            this.websocket.send(JSON.stringify({"type": "listen_rapid_start", "device_id": loader.settings.deviceId}));
        });
        this.websocket.on('message', async (data) => {
            data = JSON.parse(data);
            if (data.type == `ack`) { loader.static.events.emit(`onAck`, { type: `Connection Acknowledged`}); }
            if (data.type == `obs_st`) { loader.packages.mEvent.onObservation(data); loader.packages.mEvent.onForecast(await this.betterForecast()); }
            if (data.type == `rapid_wind`) { loader.packages.mEvent.onRapidWind(data); }
            if (data.type == `evt_strike`) { loader.packages.mEvent.onLightningStrike(data); }
        });
    }
    
    /**
      * @function onEvent
      * @description Registers an event listener for the specified event.
      *
      * @param {string} event - The name of the event to listen for.
      * @param {function} listener - The function to call when the event is emitted.
      */

    onEvent = function(event, listener) {
        loader.static.events.on(event, listener);
    }
}

module.exports = TempestCore;