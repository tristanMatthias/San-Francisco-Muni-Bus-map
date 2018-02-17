import {API_BASENAME} from 'constants';
import qs from 'qs';


/**
 * @classdesc This class is a basic wrapper for the NextBus API
 */
export default new class API {
    constructor() {
        this.baseURI = API_BASENAME;
    }

    /**
     * JSON GET request on the NextBus api. Converts response to JSON
     * @param {String} cmd Command to run
     * @param {Object} opts Optional object to convert to query string
     * @return {Promise} Fetch request promise
     */
    get(cmd, opts = {}) {
        return fetch(`${this.baseURI}?command=${cmd}&${qs.stringify(opts)}`)
            .then(res => res.json());
    }
}();
