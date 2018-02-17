import immutable from 'seamless-immutable';

import {AGENCIES_SET} from 'actions/const';

const initialState = immutable({
    agencies: []
});

export default (state = initialState, action) => {
    switch (action.type) {

        case AGENCIES_SET:
            return state.set('agencies', action.agencies);

        default:
            return state;
    }
};
