var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/helper.ts
var helper_exports = {};
__export(helper_exports, {
  AtmosXTempestPulling: () => AtmosXTempestPulling,
  default: () => helper_default
});
module.exports = __toCommonJS(helper_exports);

// bootstrap.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var events = __toESM(require("events"));
var import_ws = __toESM(require("ws"));
var packages = { fs, path, events, ws: import_ws.default };
var statics = { events: new events.EventEmitter() };
var settings = {
  apiKey: null,
  deviceId: null,
  stationId: null,
  enableForecasts: false,
  options: {
    userAgent: `AtmosXTempestPulling/1.0`,
    websocketUrl: `wss://ws.weatherflow.com/swd/data`,
    forecastUrl: `https://swd.weatherflow.com/swd/rest/better_forecast`,
    stationLookupUrl: `https://swd.weatherflow.com/swd/rest/stations`,
    closestStationUrl: `https://swd.weatherflow.com/swd/rest/map/stations`
  }
};
var definitions = {
  haultingConditions: [
    { error: "invalid-api-key", message: "The provided API key is invalid." },
    { error: "invalid-http-data", message: "The provided HTTP data is invalid." }
  ]
};

// src/measures.ts
var mMeasuring = class {
};
/**
  * @function verifyText
  * @description Verifies and formats the provided text or number. 
  * 
  * @param {any} text - The text or number to verify.
  * @param {string} addon - An optional string to append to the verified text.
  */
mMeasuring.verifyText = (text, addon = ``) => {
  if (text === null || text === void 0 || text === "") {
    return "N/A";
  }
  if (!isNaN(text)) {
    text = parseFloat(text).toFixed(2);
  }
  if (text.endsWith(".00")) {
    text = parseInt(text);
  }
  return text + (addon ? `${addon}` : ``);
};
/**
  * @function toCardinal
  * @description Converts a degree value to its corresponding cardinal direction.
  * 
  * @param {number} degree - The degree value to convert (0-360).
  */
mMeasuring.toCardinal = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};
/**
  * @function toInchesFromMillimeters
  * @description Converts millimeters to inches.
  * 
  * @param {number} mm - The value in millimeters.
  */
mMeasuring.toInchesFromMillimeters = (mm) => {
  return parseFloat((mm / 25.4).toFixed(2)) + ` in`;
};
/**
  * @function toMillimetersFromInches
  * @description Converts inches to millimeters.
  * 
  * @param {number} inches - The value in inches.
  */
mMeasuring.toMilesPerHourFromMetersPerSecond = (mps) => {
  return parseFloat((mps * 2.23694).toFixed(2)) + ` mph`;
};
/**
  * @function toMetersPerSecondFromMilesPerHour
  * @description Converts miles per hour to meters per second.
  * 
  * @param {number} mph - The value in miles per hour.
  */
mMeasuring.toFerhrenheitFromCelsius = (celsius) => {
  return parseFloat((celsius * 9 / 5 + 32).toFixed(2)) + ` \xB0F`;
};
/**
  * @function toCelsiusFromFerhrenheit
  * @description Converts Fahrenheit to Celsius.
  * 
  * @param {number} fahrenheit - The value in Fahrenheit.
  */
mMeasuring.toKilometersFromMiles = (miles) => {
  return parseFloat((miles / 0.621371).toFixed(2)) + ` km`;
};
/**
  * @function toMilesFromKilometers
  * @description Converts kilometers to miles.
  * 
  * @param {number} km - The value in kilometers.
  */
mMeasuring.toMilesFromKilometers = (km) => {
  return parseFloat((km * 0.621371).toFixed(2)) + ` mi`;
};
var measures_default = mMeasuring;

// src/events.ts
var mEvents = class {
};
/**
  * @function onRapidWind
  * @description Emits an event when a rapid wind measurement is received.
  * 
  * @param {any} data - The data received from the device.
  */
mEvents.onRapidWind = (data) => {
  statics.events.emit(`onRapidWind`, {
    type: `Wind Event`,
    from: `Device ID ${settings.deviceId}`,
    data: {
      time: measures_default.verifyText(data.ob[0]),
      speed: measures_default.verifyText(data.ob[1]),
      direction: measures_default.toCardinal(data.ob[2])
    }
  });
};
/**
  * @function onObservation
  * @description Emits an event when an observation measurement is received. 
  * 
  * @param {any} data - The data received from the device.
  */
mEvents.onObservation = (data) => {
  statics.events.emit(`onObservation`, {
    type: `Observation Event`,
    from: `Device ID ${settings.deviceId}`,
    data: {
      trend: measures_default.verifyText(data.summary.pressure_trend),
      hourly: {
        lightningStrikes: measures_default.verifyText(data.summary.strike_count_1h),
        precipitation: measures_default.toInchesFromMillimeters(data.summary.precip_total_1h)
      },
      trihourly: {
        lightningStrikes: measures_default.verifyText(data.summary.strike_count_3h)
      },
      yesterday: {
        precipitation: measures_default.toInchesFromMillimeters(data.summary.precip_accum_local_yesterday_final),
        precipitationTime: measures_default.verifyText(data.summary.precip_minutes_local_yesterday, ` minutes`)
      },
      latest: {
        lastLightningStrike: measures_default.verifyText(data.summary.strike_last_epoch),
        lastLightningStrikeDistance: measures_default.verifyText(data.summary.strike_last_dist),
        precipitationTime: measures_default.verifyText(data.summary.precip_minutes_local_day_final, ` minutes`)
      },
      obs: {
        time: measures_default.verifyText(data.obs[0][0]),
        windLull: measures_default.verifyText(measures_default.toMilesPerHourFromMetersPerSecond(data.obs[0][1])),
        windAvg: measures_default.verifyText(measures_default.toMilesPerHourFromMetersPerSecond(data.obs[0][2])),
        windGusts: measures_default.verifyText(measures_default.toMilesPerHourFromMetersPerSecond(data.obs[0][3])),
        windDirection: measures_default.toCardinal(data.obs[0][4]),
        windSampleInterval: measures_default.verifyText(data.obs[0][5], ` seconds`),
        airTemperature: measures_default.verifyText(measures_default.toFerhrenheitFromCelsius(data.obs[0][7])),
        relativeHumidity: measures_default.verifyText(data.obs[0][8], `%`),
        illuminance: measures_default.verifyText(data.obs[0][9], ` lux`),
        lightningStrikeAvgDistance: measures_default.verifyText(measures_default.toMilesFromKilometers(data.obs[0][14])),
        lightningStrikeCount: measures_default.verifyText(data.obs[0][15]),
        localDailyRainAccumulation: measures_default.verifyText(measures_default.toInchesFromMillimeters(data.obs[0][18]))
      }
    }
  });
};
/**
  * @function onForecast
  * @description Emits an event when forecast data is received.
  * 
  * @param {any} data - The forecast data received from the API.
  */
mEvents.onForecast = (data) => {
  if (data) {
    statics.events.emit(`onForecast`, {
      type: `Forecast Event`,
      from: `Station ID: ${settings.stationId}`,
      data: {
        conditions: {
          feelsLike: measures_default.verifyText(data.current_conditions.feels_like, `\xB0F`),
          airDensity: measures_default.verifyText(data.current_conditions.air_density, ` kg/m\xB3`),
          airTemperature: measures_default.verifyText(data.current_conditions.air_temperature, `\xB0F`),
          brightness: measures_default.verifyText(data.current_conditions.brightness, ` lux`),
          conditions: measures_default.verifyText(data.current_conditions.conditions),
          dewPoint: measures_default.verifyText(data.current_conditions.dew_point, `\xB0F`),
          humidity: measures_default.verifyText(data.current_conditions.relative_humidity, `%`),
          pressureTrend: measures_default.verifyText(data.current_conditions.pressure_trend || `Steady`),
          solarRadiation: measures_default.verifyText(data.current_conditions.solar_radiation, ` W/m\xB2`),
          uvIndex: measures_default.verifyText(data.current_conditions.uv, ` index`),
          windAvg: measures_default.verifyText(data.current_conditions.wind_avg, ` mph`),
          windDirection: measures_default.toCardinal(data.current_conditions.wind_direction),
          windGust: measures_default.verifyText(data.current_conditions.wind_gust, ` mph`)
        },
        station: {
          lat: measures_default.verifyText(data.latitude),
          lon: measures_default.verifyText(data.longitude),
          locationName: measures_default.verifyText(data.location_name),
          aboveGroundLevel: measures_default.verifyText(data.station.agl, `m`),
          elevation: measures_default.verifyText(data.station.elevation, `m`),
          isOnline: measures_default.verifyText(data.station.is_station_online)
        }
      }
    });
  }
};
/**
  * @function onLightning
  * @description Emits an event when a lightning strike event is received.
  * 
  * @param {any} data - The data received from the device.
  */
mEvents.onLightning = (data) => {
  statics.events.emit(`onLightning`, {
    type: `Lightning Strike Event`,
    from: `Device ID: ${settings.deviceId}`,
    data: {
      time: measures_default.verifyText(data.evt[0]),
      distance: measures_default.toKilometersFromMiles(data.evt[1]),
      energy: measures_default.verifyText(data.evt[2])
    }
  });
};
var events_default = mEvents;

// src/helper.ts
var AtmosXTempestPulling = class {
  constructor(metadata) {
    /**
      * @function initializeConnection
      * @description Initializes a WebSocket connection to the WeatherFlow service using the provided API key and device ID.
      * Sets up event listeners for connection open and incoming messages, and handles sending initial subscription messages.
      * Also retrieves station properties if a station ID is provided, and starts listening for weather events.
      */
    this.initializeConnection = () => {
      let stationLat = 0;
      let stationLon = 0;
      if (!settings.apiKey || !settings.deviceId || !settings.options.websocketUrl) {
        throw new Error(`invalid-api-key`);
      }
      const socketUrl = `${settings.options.websocketUrl}?api_key=${settings.apiKey}&location_id=${settings.deviceId}&ver=tempest-20250728`;
      this.websocket = new packages.ws(socketUrl);
      this.websocket.on("open", () => __async(this, null, function* () {
        statics.events.emit(`onConnect`, { type: `WebSocket Connected`, message: `Connected to WeatherFlow WebSocket at ${(/* @__PURE__ */ new Date()).toISOString()}` });
        if (settings.stationId) {
          const station = yield this.getStationProperties(settings.stationId);
          if (station && typeof station === "object" && "stations" in station && Array.isArray(station.stations) && station.stations[0]) {
            stationLat = station.stations[0].latitude;
            stationLon = station.stations[0].longitude;
          }
        }
        if (this.websocket) {
          if (stationLat && stationLon !== 0) {
            this.websocket.send(JSON.stringify({ "type": "geo_strike_listen_start", "lat_min": stationLat - 5, "lat_max": stationLat + 5, "lon_min": stationLon - 5, "lon_max": stationLon + 5 }));
          }
          this.websocket.send(JSON.stringify({ "type": "listen_start", "device_id": settings.deviceId }));
          this.websocket.send(JSON.stringify({ "type": "listen_rapid_start", "device_id": settings.deviceId }));
          yield this.betterForecast();
        }
      }));
      this.websocket.on("message", (network) => __async(this, null, function* () {
        let parsed = JSON.parse(network);
        let type = parsed.type;
        if (type == `ack`) {
          statics.events.emit(`onAck`, { type: `Connection Acknowledged` });
        }
        if (type == `obs_st`) {
          events_default.onObservation(parsed);
          events_default.onForecast(yield this.betterForecast());
        }
        if (type == `rapid_wind`) {
          events_default.onRapidWind(parsed);
        }
      }));
    };
    /**
      * @function betterForecast
      * @description Fetches the latest weather forecast data from the WeatherFlow service for the configured station ID.
      * Returns a promise that resolves with the forecast data or null if forecasts are disabled or an error occurs.
      * Uses the configured API key and station ID to construct the request URL and includes appropriate headers.
      */
    this.betterForecast = () => __async(null, null, function* () {
      return new Promise((resolve, reject) => {
        if (!settings.enableForecasts) {
          resolve(null);
          return;
        }
        if (!settings.stationId) {
          resolve(null);
          return;
        }
        let forecastUrl = `${settings.options.forecastUrl}?api_key=${settings.apiKey}&station_id=${settings.stationId}&units_temp=f&units_wind=mph&units_pressure=inhg&units_distance=mi&units_precip=in&units_other=imperial&units_direction=mph`;
        fetch(forecastUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json", "Accept": "application/json", "User-Agent": settings.options.userAgent }
        }).then((response) => {
          if (!response.ok) {
            resolve(null);
            throw new Error(`http-error`);
          }
          response.json().then((data) => {
            resolve(data);
          }).catch((err) => {
            resolve(null);
          });
        });
      });
    });
    /**
      * @function getStationProperties
      * @description Fetches the properties of a weather station from the WeatherFlow service using the provided station ID.
      * Returns a promise that resolves with the station data or null if an error occurs.
      * Uses the configured API key to construct the request URL and includes appropriate headers.
      * 
      * @param {number} stationId - The ID of the weather station to fetch properties for.
      */
    this.getStationProperties = (stationId) => __async(null, null, function* () {
      return new Promise((resolve, reject) => __async(null, null, function* () {
        let url = `${settings.options.stationLookupUrl}/${stationId}?&api_key=${settings.apiKey}`;
        const response = yield fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json", "Accept": "application/json", "User-Agent": settings.options.userAgent }
        });
        response.json().then((data) => {
          resolve(data);
        }).catch((err) => {
          resolve(null);
        });
      }));
    });
    /**
      * @function getClosestStation
      * @description Fetches the closest weather station to the provided latitude and longitude from the WeatherFlow service.
      * Returns a promise that resolves with the closest station data or null if no stations are found.
      * Uses the configured API key to construct the request URL and includes appropriate headers.
      * 
      * @param {number} latitude - The latitude to search for the closest station.
      * @param {number} longitude - The longitude to search for the closest station.
      */
    this.getClosestStation = (latitude, longitude) => __async(null, null, function* () {
      return new Promise((resolve, reject) => __async(null, null, function* () {
        let latMin = latitude - 5, latMax = latitude + 5;
        let lonMin = longitude - 5, lonMax = longitude + 5;
        let url = `${settings.options.closestStationUrl}?&api_key=${settings.apiKey}&build=160&limit=1&lat_min=${latMin}&lon_min=${lonMin}&lat_max=${latMax}&lon_max=${lonMax}&_=${Date.now()}`;
        const response = yield fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json", "Accept": "application/json", "User-Agent": settings.options.userAgent }
        });
        const data = yield response.json();
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
      }));
    });
    /**
      * @function setCoreSettings
      * @description Sets the core settings for the WeatherFlow connection, including device ID and station ID.
      * If the provided IDs are the same as the current settings, the function returns early.
      * Emits an 'onPropertyChange' event with the updated IDs and re-initializes the WebSocket connection.
      * 
      * @param {any} deviceId - The device ID to set.
      * @param {number} stationId - The station ID to set.
      */
    this.setCoreSettings = (deviceId, stationId) => {
      if (settings.deviceId === deviceId && settings.stationId === stationId) {
        return;
      }
      settings.deviceId = deviceId;
      settings.stationId = stationId;
      statics.events.emit(`onPropertyChange`, { message: `Device ID set to ${deviceId}, Station ID set to ${stationId}` });
      this.initializeConnection();
    };
    /**
      * @function errorHandler
      * @description Sets up a global error handler to catch uncaught exceptions and emit an 'onError' event with the error details.
      * The function checks if the error message matches any predefined halting conditions and includes the corresponding message and code in the emitted event.
      * This helps in logging and handling errors gracefully within the application.
      */
    this.errorHandler = () => {
      process.on("uncaughtException", (error) => {
        const hault = definitions.haultingConditions.find((e) => error.message.includes(e.error));
        if (hault) {
          statics.events.emit(`onError`, { error: `${hault ? hault.message : error.message}`, code: hault.code });
        }
        statics.events.emit(`onError`, { error: error.stack || error.message || `An unknown error occurred`, code: `uncaught-exception` });
      });
    };
    /** 
      * @function onEvent
      * @description Registers an event listener for the specified event and returns a function to remove the listener.
      * 
      * @param {string} event - The name of the event to listen for.
      * @param {function} callback - The callback function to execute when the event is emitted.
      * @returns {function} A function that removes the event listener when called.
      */
    this.onEvent = (event, callback) => {
      statics.events.on(event, callback);
      return () => {
        statics.events.off(event, callback);
      };
    };
    this.packages = packages;
    this.metadata = metadata;
    this.websocket = null;
    Object.assign(settings, metadata);
    this.errorHandler();
    this.initializeConnection();
  }
};
var helper_default = AtmosXTempestPulling;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AtmosXTempestPulling
});
