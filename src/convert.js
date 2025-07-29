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

class TempestConversions { 

    /**
     * @functions verifyText, convertCtF, convertFtC, convertKtM, convertMtK, convertMtIn, convertMtMi, convertMtFt, convertMtYd, convertMtMiH
     * @description Conversion functions for various units of measurement.
     * 
     * @param {string|number} text - The text to verify or convert.
     * @param {string} [addon] - Optional unit to append to the result.
     * @param {number} celsius - Temperature in Celsius.
     * @param {number} kilometers - Distance in kilometers.
     * @param {number} miles - Distance in miles.
     * @param {number} meters - Distance in meters.
     * @param {number} metersPerSecond - Speed in meters per second.
     */

    verifyText = function(text, addon) { 
        if (text === null || text === undefined || text === '') { return "N/A"; }
        if (!isNaN(text)) { text = parseFloat(text).toFixed(2); }
        if (text.endsWith(".00")) { text = parseInt(text); }
        return text + (addon ? `${addon}` : ``); 
    }
    convertCtF = function(celsius) { 
        if (celsius == null) return "N/A"; 
        let result = parseFloat(((celsius * 9/5) + 32).toFixed(2));
        return (result % 1 === 0 ? result.toFixed(0) : result) + `°F`; 
    }
    convertKtM = function(kilometers) { 
        if (kilometers == null) return "N/A"; 
        let result = parseFloat((kilometers * 0.621371).toFixed(2));
        return (result % 1 === 0 ? result.toFixed(0) : result) + `mi`; 
    }
    convertMtMi = function(meters) { 
        if (meters == null) return "N/A"; 
        let result = parseFloat((meters * 0.000621371).toFixed(2));
        return (result % 1 === 0 ? result.toFixed(0) : result) + `mi`; 
    }
    convertMmToIn = function(millimeters) { 
        if (millimeters == null) return "N/A"; 
        let result = parseFloat((millimeters / 25.4).toFixed(2));
        return (result % 1 === 0 ? result.toFixed(0) : result) + `in`; 
    }
    convertMtMiH = function(metersPerSecond) { 
        if (metersPerSecond == null) return "N/A"; 
        let result = parseFloat((metersPerSecond * 2.236936).toFixed(2));
        return (result % 1 === 0 ? result.toFixed(0) : result) + `mph`; 
    }

    /**
     * @function convertIntToCardinal
     * @description Converts an integer representing degrees to a cardinal direction.
     * 
     * @param {number} degrees - The angle in degrees.
     */

    convertIntToCardinal = function(degrees) {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }
}

module.exports = new TempestConversions();