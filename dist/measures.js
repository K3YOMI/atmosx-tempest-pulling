var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/measures.ts
var measures_exports = {};
__export(measures_exports, {
  default: () => measures_default,
  mMeasuring: () => mMeasuring
});
module.exports = __toCommonJS(measures_exports);
var mMeasuring = class {
};
/**
  * @function verifyText
  * @description Verifies and formats the provided text or number. 
  * 
  * @param {any} text - The text or number to verify.
  * @param {string} addon - An optional string to append to the verified text.
  */
mMeasuring.verifyText = (text, addon = ``) => {
  if (text === null || text === void 0 || text === "") {
    return "N/A";
  }
  if (!isNaN(text)) {
    text = parseFloat(text).toFixed(2);
  }
  if (text.endsWith(".00")) {
    text = parseInt(text);
  }
  return text + (addon ? `${addon}` : ``);
};
/**
  * @function toCardinal
  * @description Converts a degree value to its corresponding cardinal direction.
  * 
  * @param {number} degree - The degree value to convert (0-360).
  */
mMeasuring.toCardinal = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};
/**
  * @function toInchesFromMillimeters
  * @description Converts millimeters to inches.
  * 
  * @param {number} mm - The value in millimeters.
  */
mMeasuring.toInchesFromMillimeters = (mm) => {
  return parseFloat((mm / 25.4).toFixed(2)) + ` in`;
};
/**
  * @function toMillimetersFromInches
  * @description Converts inches to millimeters.
  * 
  * @param {number} inches - The value in inches.
  */
mMeasuring.toMilesPerHourFromMetersPerSecond = (mps) => {
  return parseFloat((mps * 2.23694).toFixed(2)) + ` mph`;
};
/**
  * @function toMetersPerSecondFromMilesPerHour
  * @description Converts miles per hour to meters per second.
  * 
  * @param {number} mph - The value in miles per hour.
  */
mMeasuring.toFerhrenheitFromCelsius = (celsius) => {
  return parseFloat((celsius * 9 / 5 + 32).toFixed(2)) + ` \xB0F`;
};
/**
  * @function toCelsiusFromFerhrenheit
  * @description Converts Fahrenheit to Celsius.
  * 
  * @param {number} fahrenheit - The value in Fahrenheit.
  */
mMeasuring.toKilometersFromMiles = (miles) => {
  return parseFloat((miles / 0.621371).toFixed(2)) + ` km`;
};
/**
  * @function toMilesFromKilometers
  * @description Converts kilometers to miles.
  * 
  * @param {number} km - The value in kilometers.
  */
mMeasuring.toMilesFromKilometers = (km) => {
  return parseFloat((km * 0.621371).toFixed(2)) + ` mi`;
};
var measures_default = mMeasuring;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mMeasuring
});
