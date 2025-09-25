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

import * as loader from '../bootstrap';
import mMeasuring from './measures';

export class mEvents { 

    /**
      * @function onRapidWind
      * @description Emits an event when a rapid wind measurement is received.
      * 
      * @param {any} data - The data received from the device.
      */

    static onRapidWind = (data : any) => {
        loader.statics.events.emit(`onRapidWind`, {
            type: `Wind Event`,
            from: `Device ID ${loader.settings.deviceId}`,
            data: {
                time: mMeasuring.verifyText(data.ob[0]),
                speed: mMeasuring.verifyText(data.ob[1]),
                direction: mMeasuring.toCardinal(data.ob[2]),
            }
        })
    }

    /**
      * @function onObservation
      * @description Emits an event when an observation measurement is received. 
      * 
      * @param {any} data - The data received from the device.
      */

    static onObservation = (data : any) => {
        loader.statics.events.emit(`onObservation`, { 
            type: `Observation Event`,
            from: `Device ID ${loader.settings.deviceId}`,
            data: {
                trend: mMeasuring.verifyText(data.summary.pressure_trend),
                hourly: {
                    lightningStrikes: mMeasuring.verifyText(data.summary.strike_count_1h),
                    precipitation: mMeasuring.toInchesFromMillimeters(data.summary.precip_total_1h),
                },
                trihourly: {
                    lightningStrikes: mMeasuring.verifyText(data.summary.strike_count_3h),
                },
                yesterday: {
                    precipitation: mMeasuring.toInchesFromMillimeters(data.summary.precip_accum_local_yesterday_final),
                    precipitationTime: mMeasuring.verifyText(data.summary.precip_minutes_local_yesterday, ` minutes`),
                },
                latest: {
                    lastLightningStrike: mMeasuring.verifyText(data.summary.strike_last_epoch),
                    lastLightningStrikeDistance: mMeasuring.verifyText(data.summary.strike_last_dist),
                    precipitationTime: mMeasuring.verifyText(data.summary.precip_minutes_local_day_final, ` minutes`),
                },
                obs: {
                    time: mMeasuring.verifyText(data.obs[0][0]),
                    windLull: mMeasuring.verifyText(mMeasuring.toMilesPerHourFromMetersPerSecond(data.obs[0][1])),
                    windAvg: mMeasuring.verifyText(mMeasuring.toMilesPerHourFromMetersPerSecond(data.obs[0][2])),
                    windGusts: mMeasuring.verifyText(mMeasuring.toMilesPerHourFromMetersPerSecond(data.obs[0][3])),
                    windDirection: mMeasuring.toCardinal(data.obs[0][4]),
                    windSampleInterval: mMeasuring.verifyText(data.obs[0][5], ` seconds`),
                    airTemperature: mMeasuring.verifyText(mMeasuring.toFerhrenheitFromCelsius(data.obs[0][7])),
                    relativeHumidity: mMeasuring.verifyText(data.obs[0][8], `%`),
                    illuminance: mMeasuring.verifyText(data.obs[0][9], ` lux`),
                    lightningStrikeAvgDistance: mMeasuring.verifyText(mMeasuring.toMilesFromKilometers(data.obs[0][14])),
                    lightningStrikeCount: mMeasuring.verifyText(data.obs[0][15]),
                    localDailyRainAccumulation: mMeasuring.verifyText(mMeasuring.toInchesFromMillimeters(data.obs[0][18])),
                }
            }
        })
    }

    /**
      * @function onForecast
      * @description Emits an event when forecast data is received.
      * 
      * @param {any} data - The forecast data received from the API.
      */

    static onForecast = (data: any) => {
        if (data) { 
            loader.statics.events.emit(`onForecast`, {
                type: `Forecast Event`, 
                from: `Station ID: ${loader.settings.stationId}`,
                data: {
                    conditions: {
                        feelsLike: mMeasuring.verifyText(data.current_conditions.feels_like, `°F`),
                        airDensity: mMeasuring.verifyText(data.current_conditions.air_density, ` kg/m³`),
                        airTemperature: mMeasuring.verifyText(data.current_conditions.air_temperature, `°F`),
                        brightness: mMeasuring.verifyText(data.current_conditions.brightness, ` lux`),
                        conditions: mMeasuring.verifyText(data.current_conditions.conditions),
                        dewPoint: mMeasuring.verifyText(data.current_conditions.dew_point, `°F`),
                        humidity: mMeasuring.verifyText(data.current_conditions.relative_humidity, `%`),
                        pressureTrend: mMeasuring.verifyText(data.current_conditions.pressure_trend || `Steady`),
                        solarRadiation: mMeasuring.verifyText(data.current_conditions.solar_radiation, ` W/m²`),
                        uvIndex: mMeasuring.verifyText(data.current_conditions.uv, ` index`),
                        windAvg: mMeasuring.verifyText(data.current_conditions.wind_avg, ` mph`),
                        windDirection: mMeasuring.toCardinal(data.current_conditions.wind_direction),
                        windGust: mMeasuring.verifyText(data.current_conditions.wind_gust, ` mph`),
                    },
                    station: {
                        lat: mMeasuring.verifyText(data.latitude),
                        lon: mMeasuring.verifyText(data.longitude),
                        locationName: mMeasuring.verifyText(data.location_name),
                        aboveGroundLevel: mMeasuring.verifyText(data.station.agl, `m`),
                        elevation: mMeasuring.verifyText(data.station.elevation, `m`),
                        isOnline: mMeasuring.verifyText(data.station.is_station_online),
                    },
                }
            })
        }
    }

    /**
      * @function onLightning
      * @description Emits an event when a lightning strike event is received.
      * 
      * @param {any} data - The data received from the device.
      */

    static onLightning = (data: any) => {
        loader.statics.events.emit(`onLightning`, { 
            type: `Lightning Strike Event`, 
            from: `Device ID: ${loader.settings.deviceId}`,
            data: {
                time: mMeasuring.verifyText(data.evt[0]),
                distance: mMeasuring.toKilometersFromMiles(data.evt[1]),
                energy: mMeasuring.verifyText(data.evt[2]),
            }
        })
    }

}


export default mEvents;
