"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mEvents = void 0;
var loader = __importStar(require("../bootstrap"));
var measures_1 = __importDefault(require("./measures"));
var mEvents = /** @class */ (function () {
    function mEvents() {
    }
    /**
      * @function onRapidWind
      * @description Emits an event when a rapid wind measurement is received.
      *
      * @param {any} data - The data received from the device.
      */
    mEvents.onRapidWind = function (data) {
        loader.statics.events.emit("onRapidWind", {
            type: "Wind Event",
            from: "Device ID ".concat(loader.settings.deviceId),
            data: {
                time: measures_1.default.verifyText(data.ob[0]),
                speed: measures_1.default.verifyText(data.ob[1]),
                direction: measures_1.default.toCardinal(data.ob[2]),
            }
        });
    };
    /**
      * @function onObservation
      * @description Emits an event when an observation measurement is received.
      *
      * @param {any} data - The data received from the device.
      */
    mEvents.onObservation = function (data) {
        loader.statics.events.emit("onObservation", {
            type: "Observation Event",
            from: "Device ID ".concat(loader.settings.deviceId),
            data: {
                trend: measures_1.default.verifyText(data.summary.pressure_trend),
                hourly: {
                    lightningStrikes: measures_1.default.verifyText(data.summary.strike_count_1h),
                    precipitation: measures_1.default.toInchesFromMillimeters(data.summary.precip_total_1h),
                },
                trihourly: {
                    lightningStrikes: measures_1.default.verifyText(data.summary.strike_count_3h),
                },
                yesterday: {
                    precipitation: measures_1.default.toInchesFromMillimeters(data.summary.precip_accum_local_yesterday_final),
                    precipitationTime: measures_1.default.verifyText(data.summary.precip_minutes_local_yesterday, " minutes"),
                },
                latest: {
                    lastLightningStrike: measures_1.default.verifyText(data.summary.strike_last_epoch),
                    lastLightningStrikeDistance: measures_1.default.verifyText(data.summary.strike_last_dist),
                    precipitationTime: measures_1.default.verifyText(data.summary.precip_minutes_local_day_final, " minutes"),
                },
                obs: {
                    time: measures_1.default.verifyText(data.obs[0][0]),
                    windLull: measures_1.default.verifyText(measures_1.default.toMilesPerHourFromMetersPerSecond(data.obs[0][1])),
                    windAvg: measures_1.default.verifyText(measures_1.default.toMilesPerHourFromMetersPerSecond(data.obs[0][2])),
                    windGusts: measures_1.default.verifyText(measures_1.default.toMilesPerHourFromMetersPerSecond(data.obs[0][3])),
                    windDirection: measures_1.default.toCardinal(data.obs[0][4]),
                    windSampleInterval: measures_1.default.verifyText(data.obs[0][5], " seconds"),
                    airTemperature: measures_1.default.verifyText(measures_1.default.toFerhrenheitFromCelsius(data.obs[0][7])),
                    relativeHumidity: measures_1.default.verifyText(data.obs[0][8], "%"),
                    illuminance: measures_1.default.verifyText(data.obs[0][9], " lux"),
                    lightningStrikeAvgDistance: measures_1.default.verifyText(measures_1.default.toMilesFromKilometers(data.obs[0][14])),
                    lightningStrikeCount: measures_1.default.verifyText(data.obs[0][15]),
                    localDailyRainAccumulation: measures_1.default.verifyText(measures_1.default.toInchesFromMillimeters(data.obs[0][18])),
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
    mEvents.onForecast = function (data) {
        if (data) {
            loader.statics.events.emit("onForecast", {
                type: "Forecast Event",
                from: "Station ID: ".concat(loader.settings.stationId),
                data: {
                    conditions: {
                        feelsLike: measures_1.default.verifyText(data.current_conditions.feels_like, "\u00B0F"),
                        airDensity: measures_1.default.verifyText(data.current_conditions.air_density, " kg/m\u00B3"),
                        airTemperature: measures_1.default.verifyText(data.current_conditions.air_temperature, "\u00B0F"),
                        brightness: measures_1.default.verifyText(data.current_conditions.brightness, " lux"),
                        conditions: measures_1.default.verifyText(data.current_conditions.conditions),
                        dewPoint: measures_1.default.verifyText(data.current_conditions.dew_point, "\u00B0F"),
                        humidity: measures_1.default.verifyText(data.current_conditions.relative_humidity, "%"),
                        pressureTrend: measures_1.default.verifyText(data.current_conditions.pressure_trend || "Steady"),
                        solarRadiation: measures_1.default.verifyText(data.current_conditions.solar_radiation, " W/m\u00B2"),
                        uvIndex: measures_1.default.verifyText(data.current_conditions.uv, " index"),
                        windAvg: measures_1.default.verifyText(data.current_conditions.wind_avg, " mph"),
                        windDirection: measures_1.default.toCardinal(data.current_conditions.wind_direction),
                        windGust: measures_1.default.verifyText(data.current_conditions.wind_gust, " mph"),
                    },
                    station: {
                        lat: measures_1.default.verifyText(data.latitude),
                        lon: measures_1.default.verifyText(data.longitude),
                        locationName: measures_1.default.verifyText(data.location_name),
                        aboveGroundLevel: measures_1.default.verifyText(data.station.agl, "m"),
                        elevation: measures_1.default.verifyText(data.station.elevation, "m"),
                        isOnline: measures_1.default.verifyText(data.station.is_station_online),
                    },
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
    mEvents.onLightning = function (data) {
        loader.statics.events.emit("onLightning", {
            type: "Lightning Strike Event",
            from: "Device ID: ".concat(loader.settings.deviceId),
            data: {
                time: measures_1.default.verifyText(data.evt[0]),
                distance: measures_1.default.toKilometersFromMiles(data.evt[1]),
                energy: measures_1.default.verifyText(data.evt[2]),
            }
        });
    };
    return mEvents;
}());
exports.mEvents = mEvents;
exports.default = mEvents;
