import immutable from 'seamless-immutable';

import {VEHICLES_SET} from 'actions/const';

const initialState = immutable({
    vehicles: []
});

export default (state = initialState, action) => {
    switch (action.type) {

        case VEHICLES_SET:
            if (!action.vehicle) return state;
            // Attempt to find an existing vehicle...
            const existing = state.vehicles.findIndex(v => v.id === action.vehicle.id);
            // If it exists, then update it at the index
            if (existing > -1) {
                return state.setIn(['vehicles', existing], {
                    ...existing,
                    ...action.vehicle
                });
            // Otherwise append it to the list
            } else return state.set('vehicles',
                state.vehicles.concat(
                    immutable(
                        [action.vehicle]
                    )
                )
            );

        default:
            return state;
    }
};
