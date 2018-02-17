import {API} from 'lib';

import {
    AGENCY_NAME
} from 'constants';

import {
    ROUTES_GET, ROUTES_SET, ROUTES_FILTER_SET
} from './const';

/**
 * Get the bus routes for the agency
 * @returns {Function} Dispatch redux function
 */
export const get = () =>
    async dispatch => {
        dispatch({type: ROUTES_GET});
        const {route: routes} = await API.get('routeList', {a: AGENCY_NAME});

        dispatch({type: ROUTES_SET, routes});
    };

/**
 * Update the filter limiting the routes shown on the map
 * @param {String} f Filtered string
 * @returns {Function} Dispatch redux function
 */
export const filter = f =>
    dispatch => dispatch({type: ROUTES_FILTER_SET, filter: f});
