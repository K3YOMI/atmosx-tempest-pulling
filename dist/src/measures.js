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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mMeasuring = void 0;
var mMeasuring = /** @class */ (function () {
    function mMeasuring() {
    }
    /**
      * @function verifyText
      * @description Verifies and formats the provided text or number.
      *
      * @param {any} text - The text or number to verify.
      * @param {string} addon - An optional string to append to the verified text.
      */
    mMeasuring.verifyText = function (text, addon) {
        if (addon === void 0) { addon = ""; }
        if (text === null || text === undefined || text === '') {
            return "N/A";
        }
        if (!isNaN(text)) {
            text = parseFloat(text).toFixed(2);
        }
        if (text.endsWith(".00")) {
            text = parseInt(text);
        }
        return text + (addon ? "".concat(addon) : "");
    };
    /**
      * @function toCardinal
      * @description Converts a degree value to its corresponding cardinal direction.
      *
      * @param {number} degree - The degree value to convert (0-360).
      */
    mMeasuring.toCardinal = function (degree) {
        var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        var index = Math.round(degree / 45) % 8;
        return directions[index];
    };
    /**
      * @function toInchesFromMillimeters
      * @description Converts millimeters to inches.
      *
      * @param {number} mm - The value in millimeters.
      */
    mMeasuring.toInchesFromMillimeters = function (mm) {
        return parseFloat((mm / 25.4).toFixed(2)) + " in";
    };
    /**
      * @function toMillimetersFromInches
      * @description Converts inches to millimeters.
      *
      * @param {number} inches - The value in inches.
      */
    mMeasuring.toMilesPerHourFromMetersPerSecond = function (mps) {
        return parseFloat((mps * 2.23694).toFixed(2)) + " mph";
    };
    /**
      * @function toMetersPerSecondFromMilesPerHour
      * @description Converts miles per hour to meters per second.
      *
      * @param {number} mph - The value in miles per hour.
      */
    mMeasuring.toFerhrenheitFromCelsius = function (celsius) {
        return parseFloat(((celsius * 9 / 5) + 32).toFixed(2)) + " \u00B0F";
    };
    /**
      * @function toCelsiusFromFerhrenheit
      * @description Converts Fahrenheit to Celsius.
      *
      * @param {number} fahrenheit - The value in Fahrenheit.
      */
    mMeasuring.toKilometersFromMiles = function (miles) {
        return parseFloat((miles / 0.621371).toFixed(2)) + " km";
    };
    /**
      * @function toMilesFromKilometers
      * @description Converts kilometers to miles.
      *
      * @param {number} km - The value in kilometers.
      */
    mMeasuring.toMilesFromKilometers = function (km) {
        return parseFloat((km * 0.621371).toFixed(2)) + " mi";
    };
    return mMeasuring;
}());
exports.mMeasuring = mMeasuring;
exports.default = mMeasuring;
