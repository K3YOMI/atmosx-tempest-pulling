module.exports = {
    cache: {},
    settings: {},
    static: {},
    packages: {},
    definitions: {}
}

module.exports.packages = {
    fs: require(`fs`),
    path: require(`path`),
    events: require(`events`),
    ws: require(`ws`),
    mConvert: require(`./src/convert.js`),
    mEvent: require(`./src/events.js`),
}

module.exports.definitions = {
    haultingConditions: [
        { error: "missing-api-or-device-id", message: "Missing API key or device ID", code: "missing-api-or-device-id" },
        { error: "http-error", message: "HTTP error occurred while fetching data", code: "http-error" },
    ]
};

module.exports.settings = { 
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
    },
};


module.exports.cache = { nextRefresh: 60, lastForecast: 0 };

module.exports.static.events = new module.exports.packages.events.EventEmitter();