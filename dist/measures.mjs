// src/measures.ts
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
export {
  measures_default as default,
  mMeasuring
};
