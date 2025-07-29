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

let loader = require(`../bootstrap.js`);

class TempestEvents { 

    /**
      * @function onRapidWind
      * @description Event handler for rapid wind events. 
      * 
      * @param {Object} data - The data object containing rapid wind event information. 
      */

    onRapidWind = function(data) { 
        loader.static.events.emit(`onWind`, {
            type: `Wind Event`, 
            from: `Device ID: ${loader.settings.deviceId}`,
            data: {
                time: loader.packages.mConvert.verifyText(data.ob[0]), 
                speed: loader.packages.mConvert.convertMtMiH(data.ob[1]),
                direction: loader.packages.mConvert.convertIntToCardinal(data.ob[2])
            }
        });
    }

    /**
      * @function onObservation
      * @description Event handler for observation events.
      * 
      * @param {Object} data - The data object containing observation event information.
      */

    onObservation = function(data) {
        loader.static.events.emit(`onObservation`, { 
            type: `Observation Event`,  
            from: `Device ID: ${loader.settings.deviceId}`, 
            data: {
                trend: loader.packages.mConvert.verifyText(data.summary.pressure_trend),
                hourly: {
                    lightningStrikes: loader.packages.mConvert.verifyText(data.summary.strike_count_1h),
                    precipitation: loader.packages.mConvert.convertMmToIn(data.summary.precip_total_1h),
                },
                trihourly: {
                    lightningStrikes: loader.packages.mConvert.verifyText(data.summary.strike_count_3h),
                },
                yesterday: {
                    precipitation: loader.packages.mConvert.convertMmToIn(data.summary.precip_accum_local_yesterday_final),
                    precipitationTime: loader.packages.mConvert.verifyText(data.summary.precip_minutes_local_yesterday, ` minutes`),
                },
                latest: {
                    lastLightningStrike: loader.packages.mConvert.verifyText(data.summary.strike_last_epoch),
                    lastLightningStrikeDistance: loader.packages.mConvert.verifyText(data.summary.strike_last_dist),
                    precipitationTime: loader.packages.mConvert.verifyText(data.summary.precip_minutes_local_day_final, ` minutes`),
                },
                obs: {
                    time: loader.packages.mConvert.verifyText(data.obs[0][0]),
                    windLull: loader.packages.mConvert.verifyText(loader.packages.mConvert.convertMtMiH(data.obs[0][1])),
                    windAvg: loader.packages.mConvert.verifyText(loader.packages.mConvert.convertMtMiH(data.obs[0][2])),
                    windGusts: loader.packages.mConvert.verifyText(loader.packages.mConvert.convertMtMiH(data.obs[0][3])),
                    windDirection: loader.packages.mConvert.convertIntToCardinal(data.obs[0][4]),
                    windSampleInterval: loader.packages.mConvert.verifyText(data.obs[0][5], ` seconds`),
                    airTemperature: loader.packages.mConvert.verifyText(loader.packages.mConvert.convertCtF(data.obs[0][7])),
                    relativeHumidity: loader.packages.mConvert.verifyText(data.obs[0][8], `%`),
                    illuminance: loader.packages.mConvert.verifyText(data.obs[0][9], ` lux`),
                    lightningStrikeAvgDistance: loader.packages.mConvert.verifyText(loader.packages.mConvert.convertKtM(data.obs[0][14])),
                    lightningStrikeCount: loader.packages.mConvert.verifyText(data.obs[0][15]),
                    localDailyRainAccumulation: loader.packages.mConvert.verifyText(loader.packages.mConvert.convertMmToIn(data.obs[0][18])),
                }
            }
        });
    }

    /**
      * @function onForecast
      * @description Event handler for forecast events.
      * 
      * @param {Object} data - The data object containing forecast event information.
      */

    onForecast = function(data) { 
        if (data) {
            loader.static.events.emit(`onForecast`, {
                type: `Forecast Event`, 
                from: `Station ID: ${loader.settings.stationId}`,
                data: {
                    conditions: {
                        feelsLike: loader.packages.mConvert.verifyText(data.current_conditions.feels_like, `°F`),
                        airDensity: loader.packages.mConvert.verifyText(data.current_conditions.air_density, ` kg/m³`),
                        airTemperature: loader.packages.mConvert.verifyText(data.current_conditions.air_temperature, `°F`),
                        brightness: loader.packages.mConvert.verifyText(data.current_conditions.brightness, ` lux`),
                        conditions: loader.packages.mConvert.verifyText(data.current_conditions.conditions),
                        dewPoint: loader.packages.mConvert.verifyText(data.current_conditions.dew_point, `°F`),
                        humidity: loader.packages.mConvert.verifyText(data.current_conditions.relative_humidity, `%`),
                        pressureTrend: loader.packages.mConvert.verifyText(data.current_conditions.pressure_trend || `Steady`),
                        solarRadiation: loader.packages.mConvert.verifyText(data.current_conditions.solar_radiation, ` W/m²`),
                        uvIndex: loader.packages.mConvert.verifyText(data.current_conditions.uv, ` index`),
                        windAvg: loader.packages.mConvert.verifyText(data.current_conditions.wind_avg, ` mph`),
                        windDirection: loader.packages.mConvert.convertIntToCardinal(data.current_conditions.wind_direction),
                        windGust: loader.packages.mConvert.verifyText(data.current_conditions.wind_gust, ` mph`),
                    },
                    station: {
                        lat: loader.packages.mConvert.verifyText(data.latitude),
                        lon: loader.packages.mConvert.verifyText(data.longitude),
                        locationName: loader.packages.mConvert.verifyText(data.location_name),
                        aboveGroundLevel: loader.packages.mConvert.verifyText(data.station.agl, `m`),
                        elevation: loader.packages.mConvert.verifyText(data.station.elevation, `m`),
                        isOnline: loader.packages.mConvert.verifyText(data.station.is_station_online),
                    },
                }
            });
        }
    }

    /**
      * @function onLightningStrike
      * @description Event handler for lightning strike events.
      *
      * @param {Object} data - The data object containing lightning strike event information.
      */

    onLightningStrike = function(data) {
         loader.static.events.emit(`onLightning`, { 
            type: `Lightning Strike Event`, 
            from: `Device ID: ${loader.settings.deviceId}`,
            data: {
                time: loader.packages.mConvert.verifyText(data.evt[0]),
                distance: loader.packages.mConvert.convertKtM(data.evt[1]),
                energy: loader.packages.mConvert.verifyText(data.evt[2]),
            }
        })
    }
}

module.exports = new TempestEvents();