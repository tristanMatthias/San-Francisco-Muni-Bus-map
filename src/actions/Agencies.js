import {API} from 'lib';

import {
    AGENCY_NAME
} from 'constants';

import {
    AGENCIES_GET, AGENCIES_SET,
    VEHICLES_SET
} from './const';


/**
 * Get a list of agencies
 * @returns {Function} Dispatch redux function
 */
export const get = () =>
    async dispatch => {
        dispatch({type: AGENCIES_GET});
        let {agency: agencies} = await API.get('agencyList');

        // Limit data to California region only
        // Was commented out in case more agencies want to be tracked
        // agencies = agencies.filter(a => a.regionTitle.includes('California-'));

        // Limit data to SF Muni
        agencies = agencies.filter(a => a.tag === AGENCY_NAME);

        dispatch({type: AGENCIES_SET, agencies});
    };

/**
 * Get the locations of the vehicles
 * @param {String} agency Agency to get the vehicles of
 * @returns {Function} Dispatch redux function
 */
export const getLocations = agency =>
    async dispatch => {
        const {vehicle, lastTime} = await API.get('vehicleLocations', {a: agency});
        const vehicles = vehicle instanceof Array ? vehicle : [vehicle];

        vehicles.forEach(v => {
            dispatch({type: VEHICLES_SET, vehicle: v, lastTime});
        });
    };
