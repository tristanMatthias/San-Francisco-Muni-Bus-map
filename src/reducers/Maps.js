import immutable from 'seamless-immutable';

import {MAPS_GET_LOADING, MAPS_SET} from 'actions/const';

const initialState = immutable({
    maps: {
        'arteries': [],
        'freeways': [],
        'neighborhoods': [],
        'streets': []
    },
    loading: {
        'arteries': null,
        'freeways': null,
        'neighborhoods': null,
        'streets': null
    }
});

export default (state = initialState, action) => {
    switch (action.type) {
        case MAPS_GET_LOADING:
            return state.setIn(['loading', action.map], action.loading);

        case MAPS_SET:
            return state.setIn(['maps', action.mapType], action.data);

        default:
            return state;
    }
};
