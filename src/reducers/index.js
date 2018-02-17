import {combineReducers} from 'redux';


import Maps from './Maps';
import Agencies from './Agencies';
import Vehicles from './Vehicles';
import Routes from './Routes';


export default combineReducers({
    Maps,
    Agencies,
    Vehicles,
    Routes
});
