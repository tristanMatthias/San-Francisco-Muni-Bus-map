import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Routes} from 'actions';


/**
 * @classdesc A simple input field that filters the available vehicles on the map
*/
export class RouteFilter extends React.Component {
    componentDidMount() {
        this.props.actions.getRoutes();
    }

    render() {
        return <div className="route-filter">
            <input type="text" placeholder="Search routes…" onChange={e => this.filter(e.target.value)}/>
        </div>;
    }

    filter(v) {
        this.props.actions.filterRoutes(v);
    }
}

const mapStateToProps = state => ({
    routes: state.Routes.routes,
    filtered: state.Routes.filtered
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getRoutes: Routes.get,
        filterRoutes: Routes.filter
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteFilter);
