declare class mMeasuring {
    /**
      * @function verifyText
      * @description Verifies and formats the provided text or number.
      *
      * @param {any} text - The text or number to verify.
      * @param {string} addon - An optional string to append to the verified text.
      */
    static verifyText: (text: any, addon?: string) => string;
    /**
      * @function toCardinal
      * @description Converts a degree value to its corresponding cardinal direction.
      *
      * @param {number} degree - The degree value to convert (0-360).
      */
    static toCardinal: (degree: number) => string;
    /**
      * @function toInchesFromMillimeters
      * @description Converts millimeters to inches.
      *
      * @param {number} mm - The value in millimeters.
      */
    static toInchesFromMillimeters: (mm: number) => string;
    /**
      * @function toMillimetersFromInches
      * @description Converts inches to millimeters.
      *
      * @param {number} inches - The value in inches.
      */
    static toMilesPerHourFromMetersPerSecond: (mps: number) => string;
    /**
      * @function toMetersPerSecondFromMilesPerHour
      * @description Converts miles per hour to meters per second.
      *
      * @param {number} mph - The value in miles per hour.
      */
    static toFerhrenheitFromCelsius: (celsius: number) => string;
    /**
      * @function toCelsiusFromFerhrenheit
      * @description Converts Fahrenheit to Celsius.
      *
      * @param {number} fahrenheit - The value in Fahrenheit.
      */
    static toKilometersFromMiles: (miles: number) => string;
    /**
      * @function toMilesFromKilometers
      * @description Converts kilometers to miles.
      *
      * @param {number} km - The value in kilometers.
      */
    static toMilesFromKilometers: (km: number) => string;
}

export { mMeasuring as default, mMeasuring };
