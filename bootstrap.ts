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


import * as fs from 'fs';
import * as path from 'path';
import * as events from 'events';
import ws from 'ws';


export const packages = {fs, path, events, ws };
export const statics = { events: new events.EventEmitter() };

export const settings = {
    apiKey: null,
    deviceId: null,
    stationId: null,
    enableForecasts: false,
    options: {
        userAgent: `AtmosXTempestPulling/1.0`,
        websocketUrl: `wss://ws.weatherflow.com/swd/data`,
        forecastUrl: `https://swd.weatherflow.com/swd/rest/better_forecast`,
        stationLookupUrl: `https://swd.weatherflow.com/swd/rest/stations`,
        closestStationUrl: `https://swd.weatherflow.com/swd/rest/map/stations`,
    }
}

export const definitions = {
    haultingConditions: [
        { error: "invalid-api-key", message: "The provided API key is invalid." },
        { error: "invalid-http-data", message: "The provided HTTP data is invalid." },
    ]
}
