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

// src/events.ts
var events_exports = {};
__export(events_exports, {
  default: () => events_default,
  mEvents: () => mEvents
});
module.exports = __toCommonJS(events_exports);

// bootstrap.ts
var events = __toESM(require("events"));
var import_ws = __toESM(require("ws"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mEvents
});
