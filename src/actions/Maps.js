import {MAPS_GET_LOADING, MAPS_SET} from './const';

/**
 * Get the map data from the server under /data/
 * @param {String} type Map layer type
 * @returns {Function} Dispatch redux function
 */
export const get = type =>
    async dispatch => {
        const valid = ['arteries', 'freeways', 'neighborhoods', 'streets'];
        if (!valid.includes(type)) throw new Error('Invalid map type');

        dispatch({type: MAPS_GET_LOADING, map: type, loading: true});

        const data = await fetch(`/data/${type}.json`)
            .then(r => r.json());

        dispatch({type: MAPS_SET, mapType: type, data});

        dispatch({type: MAPS_GET_LOADING, map: type, loading: false});
    };
