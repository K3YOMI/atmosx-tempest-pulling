declare class mEvents {
    /**
      * @function onRapidWind
      * @description Emits an event when a rapid wind measurement is received.
      *
      * @param {any} data - The data received from the device.
      */
    static onRapidWind: (data: any) => void;
    /**
      * @function onObservation
      * @description Emits an event when an observation measurement is received.
      *
      * @param {any} data - The data received from the device.
      */
    static onObservation: (data: any) => void;
    /**
      * @function onForecast
      * @description Emits an event when forecast data is received.
      *
      * @param {any} data - The forecast data received from the API.
      */
    static onForecast: (data: any) => void;
    /**
      * @function onLightning
      * @description Emits an event when a lightning strike event is received.
      *
      * @param {any} data - The data received from the device.
      */
    static onLightning: (data: any) => void;
}

export { mEvents as default, mEvents };
