import immutable from 'seamless-immutable';

import {ROUTES_SET, ROUTES_FILTER_SET} from 'actions/const';

const initialState = immutable({
    routes: [],
    filtered: false
});

export default (state = initialState, action) => {
    switch (action.type) {

        case ROUTES_SET:
            return state.set('routes', action.routes);

        case ROUTES_FILTER_SET:
            if (!action.filter) return state.set('filtered', false);

            return state.set('filtered',
                state.routes.filter(r => r.tag.includes(action.filter))
            );

        default:
            return state;
    }
};
