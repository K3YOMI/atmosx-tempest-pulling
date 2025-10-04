const {AtmosXTempestPulling} = require(`../index.js`);

let Client = new AtmosXTempestPulling({
    apiKey: `API-KEY-HERE`,
    deviceId: 0,
    stationId: 0,
    enableForecasts: true,
});

Client.getClosestStation(41.118858, -95.602).then((station) => {
    Client.setCoreSettings(station.stations[0], station.id);
})  
Client.onEvent(`onAck`, (msg) => {console.log(msg)});
Client.onEvent(`onObservation`, (msg) => {console.log(msg)});
Client.onEvent(`onRapidWind`, (data) => {console.log(data)});
Client.onEvent(`onForecast`, (data) => {console.log(data)});
Client.onEvent(`onLightning`, (data) => {console.log(data)});
Client.onEvent(`onError`, (err) => {console.log(err)});
Client.onEvent(`onPropertyChange`, (msg) => { console.log(msg) });
