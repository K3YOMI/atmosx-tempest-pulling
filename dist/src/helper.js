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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtmosXTempestPulling = void 0;
var loader = __importStar(require("../bootstrap"));
var events_1 = __importDefault(require("./events"));
var AtmosXTempestPulling = /** @class */ (function () {
    function AtmosXTempestPulling(metadata) {
        var _this = this;
        /**
          * @function initializeConnection
          * @description Initializes a WebSocket connection to the WeatherFlow service using the provided API key and device ID.
          * Sets up event listeners for connection open and incoming messages, and handles sending initial subscription messages.
          * Also retrieves station properties if a station ID is provided, and starts listening for weather events.
          */
        this.initializeConnection = function () {
            var stationLat = 0;
            var stationLon = 0;
            if (!loader.settings.apiKey || !loader.settings.deviceId || !loader.settings.options.websocketUrl) {
                throw new Error("invalid-api-key");
            }
            var socketUrl = "".concat(loader.settings.options.websocketUrl, "?api_key=").concat(loader.settings.apiKey, "&location_id=").concat(loader.settings.deviceId, "&ver=tempest-20250728");
            _this.websocket = new loader.packages.ws(socketUrl);
            _this.websocket.on('open', function () { return __awaiter(_this, void 0, void 0, function () {
                var station;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loader.statics.events.emit("onConnect", { type: "WebSocket Connected", message: "Connected to WeatherFlow WebSocket at ".concat(new Date().toISOString()) });
                            if (!loader.settings.stationId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getStationProperties(loader.settings.stationId)];
                        case 1:
                            station = _a.sent();
                            if (station && typeof station === 'object' && 'stations' in station && Array.isArray(station.stations) && station.stations[0]) {
                                stationLat = station.stations[0].latitude;
                                stationLon = station.stations[0].longitude;
                            }
                            _a.label = 2;
                        case 2:
                            if (!this.websocket) return [3 /*break*/, 4];
                            if (stationLat && stationLon !== 0) {
                                this.websocket.send(JSON.stringify({ "type": "geo_strike_listen_start", "lat_min": stationLat - 5, "lat_max": stationLat + 5, "lon_min": stationLon - 5, "lon_max": stationLon + 5, }));
                            }
                            this.websocket.send(JSON.stringify({ "type": "listen_start", "device_id": loader.settings.deviceId }));
                            this.websocket.send(JSON.stringify({ "type": "listen_rapid_start", "device_id": loader.settings.deviceId }));
                            return [4 /*yield*/, this.betterForecast()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            _this.websocket.on('message', function (network) { return __awaiter(_this, void 0, void 0, function () {
                var parsed, type, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            parsed = JSON.parse(network);
                            type = parsed.type;
                            if (type == "ack") {
                                loader.statics.events.emit("onAck", { type: "Connection Acknowledged" });
                            }
                            if (!(type == "obs_st")) return [3 /*break*/, 2];
                            events_1.default.onObservation(parsed);
                            _b = (_a = events_1.default).onForecast;
                            return [4 /*yield*/, this.betterForecast()];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            _c.label = 2;
                        case 2:
                            if (type == "rapid_wind") {
                                events_1.default.onRapidWind(parsed);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
          * @function betterForecast
          * @description Fetches the latest weather forecast data from the WeatherFlow service for the configured station ID.
          * Returns a promise that resolves with the forecast data or null if forecasts are disabled or an error occurs.
          * Uses the configured API key and station ID to construct the request URL and includes appropriate headers.
          */
        this.betterForecast = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!loader.settings.enableForecasts) {
                            resolve(null);
                            return;
                        }
                        if (!loader.settings.stationId) {
                            resolve(null);
                            return;
                        }
                        var forecastUrl = "".concat(loader.settings.options.forecastUrl, "?api_key=").concat(loader.settings.apiKey, "&station_id=").concat(loader.settings.stationId, "&units_temp=f&units_wind=mph&units_pressure=inhg&units_distance=mi&units_precip=in&units_other=imperial&units_direction=mph");
                        fetch(forecastUrl, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
                        }).then(function (response) {
                            if (!response.ok) {
                                resolve(null);
                                throw new Error("http-error");
                            }
                            response.json().then(function (data) { resolve(data); }).catch(function (err) { resolve(null); });
                        });
                    })];
            });
        }); };
        /**
          * @function getStationProperties
          * @description Fetches the properties of a weather station from the WeatherFlow service using the provided station ID.
          * Returns a promise that resolves with the station data or null if an error occurs.
          * Uses the configured API key to construct the request URL and includes appropriate headers.
          *
          * @param {number} stationId - The ID of the weather station to fetch properties for.
          */
        this.getStationProperties = function (stationId) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    url = "".concat(loader.settings.options.stationLookupUrl, "/").concat(stationId, "?&api_key=").concat(loader.settings.apiKey);
                                    return [4 /*yield*/, fetch(url, {
                                            method: 'GET',
                                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
                                        })];
                                case 1:
                                    response = _a.sent();
                                    response.json().then(function (data) {
                                        resolve(data);
                                    }).catch(function (err) { resolve(null); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        }); };
        /**
          * @function getClosestStation
          * @description Fetches the closest weather station to the provided latitude and longitude from the WeatherFlow service.
          * Returns a promise that resolves with the closest station data or null if no stations are found.
          * Uses the configured API key to construct the request URL and includes appropriate headers.
          *
          * @param {number} latitude - The latitude to search for the closest station.
          * @param {number} longitude - The longitude to search for the closest station.
          */
        this.getClosestStation = function (latitude, longitude) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var latMin, latMax, lonMin, lonMax, url, response, data, stations, closestStation;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    latMin = latitude - 5, latMax = latitude + 5;
                                    lonMin = longitude - 5, lonMax = longitude + 5;
                                    url = "".concat(loader.settings.options.closestStationUrl, "?&api_key=").concat(loader.settings.apiKey, "&build=160&limit=1&lat_min=").concat(latMin, "&lon_min=").concat(lonMin, "&lat_max=").concat(latMax, "&lon_max=").concat(lonMax, "&_=").concat(Date.now());
                                    return [4 /*yield*/, fetch(url, {
                                            method: 'GET',
                                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "User-Agent": loader.settings.options.userAgent }
                                        })];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    stations = data.features;
                                    closestStation = stations.reduce(function (closest, station) {
                                        var _a = station.geometry.coordinates, stationLon = _a[0], stationLat = _a[1];
                                        var distance = Math.sqrt(Math.pow(latitude - stationLat, 2) + Math.pow(longitude - stationLon, 2));
                                        return !closest || distance < closest.distance ? { station: station, distance: distance } : closest;
                                    }, null);
                                    if (closestStation) {
                                        resolve({ id: closestStation.station.id, name: closestStation.station.properties.name, distance: closestStation.distance, stations: closestStation.station.properties.devices });
                                    }
                                    else {
                                        resolve(null);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        }); };
        /**
          * @function setCoreSettings
          * @description Sets the core settings for the WeatherFlow connection, including device ID and station ID.
          * If the provided IDs are the same as the current settings, the function returns early.
          * Emits an 'onPropertyChange' event with the updated IDs and re-initializes the WebSocket connection.
          *
          * @param {any} deviceId - The device ID to set.
          * @param {number} stationId - The station ID to set.
          */
        this.setCoreSettings = function (deviceId, stationId) {
            if (loader.settings.deviceId === deviceId && loader.settings.stationId === stationId) {
                return;
            }
            loader.settings.deviceId = deviceId;
            loader.settings.stationId = stationId;
            loader.statics.events.emit("onPropertyChange", { message: "Device ID set to ".concat(deviceId, ", Station ID set to ").concat(stationId) });
            _this.initializeConnection();
        };
        /**
          * @function errorHandler
          * @description Sets up a global error handler to catch uncaught exceptions and emit an 'onError' event with the error details.
          * The function checks if the error message matches any predefined halting conditions and includes the corresponding message and code in the emitted event.
          * This helps in logging and handling errors gracefully within the application.
          */
        this.errorHandler = function () {
            process.on('uncaughtException', function (error) {
                var hault = loader.definitions.haultingConditions.find(function (e) { return error.message.includes(e.error); });
                if (hault) {
                    loader.statics.events.emit("onError", { error: "".concat(hault ? hault.message : error.message), code: hault.code });
                }
                loader.statics.events.emit("onError", { error: error.stack || error.message || "An unknown error occurred", code: "uncaught-exception" });
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
        this.onEvent = function (event, callback) {
            loader.statics.events.on(event, callback);
            return function () { loader.statics.events.off(event, callback); };
        };
        this.packages = loader.packages;
        this.metadata = metadata;
        this.websocket = null;
        Object.assign(loader.settings, metadata);
        this.errorHandler();
        this.initializeConnection();
    }
    return AtmosXTempestPulling;
}());
exports.AtmosXTempestPulling = AtmosXTempestPulling;
module.exports = AtmosXTempestPulling;
