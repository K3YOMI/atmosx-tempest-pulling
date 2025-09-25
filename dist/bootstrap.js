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
exports.definitions = exports.settings = exports.statics = exports.packages = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var events = __importStar(require("events"));
var ws_1 = __importDefault(require("ws"));
exports.packages = { fs: fs, path: path, events: events, ws: ws_1.default };
exports.statics = { events: new events.EventEmitter() };
exports.settings = {
    apiKey: null,
    deviceId: null,
    stationId: null,
    enableForecasts: false,
    options: {
        userAgent: "AtmosXTempestPulling/1.0",
        websocketUrl: "wss://ws.weatherflow.com/swd/data",
        forecastUrl: "https://swd.weatherflow.com/swd/rest/better_forecast",
        stationLookupUrl: "https://swd.weatherflow.com/swd/rest/stations",
        closestStationUrl: "https://swd.weatherflow.com/swd/rest/map/stations",
    }
};
exports.definitions = {
    haultingConditions: [
        { error: "invalid-api-key", message: "The provided API key is invalid." },
        { error: "invalid-http-data", message: "The provided HTTP data is invalid." },
    ]
};
