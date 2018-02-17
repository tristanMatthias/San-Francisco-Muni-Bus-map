import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as d3 from 'd3';

import {Agencies} from 'actions';

/**
 * @classdesc VehicleLayer is a single layer of the map. It's a static svg group
 * with the vehicle data plotted onto the map.
*/
class VehicleLayer extends React.Component {
    constructor(props) {
        super(props);
        // Update the buses data every 15 seconds
        this.updateInterval = 15000;
    }

    async componentDidMount() {
        // Retrieve the bus agencies...
        await this.props.actions.getAgencies();
        // Then fetch the vehicle locations
        this.fetch();

        // Setup a fetch every 15 seconds
        this.interval = setInterval(this.fetch.bind(this), this.updateInterval);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    componentDidUpdate() {
        // Update the svg if the component updates in React
        this.update();
    }

    /**
     * Map the filtered properties to an array of tags
     * @type {Array<String>}
     */
    get routes() {
        if (!this.props.routes) return false;

        return this.props.routes.map(r => r.tag);
    }

    /**
     * Filtered list of vehicles mapped to their lat and long coords
     * @type {Array<Array>}
     */
    get data() {
        if (!this.props.vehicles) return;

        let res = this.props.vehicles;

        if (this.routes) {
            res = res.filter(v => this.routes.includes(v.routeTag));
        }

        res = res.map(v => [v.lon, v.lat]);


        return res;
    }

    /**
     * Update the vehicles locations
     */
    update() {
        if (!this.props.projection) return;

        const points = this.props.svg
            .selectAll('circle')
            .data(this.data);

        points.enter()
            .append('circle')
            .merge(points)
            .attr('cx', d => this.props.projection(d)[0])
            .attr('cy', d => this.props.projection(d)[1])
            .attr('r', '4px');

        points.exit().remove();
    }


    /**
     * Retrieve new vehicle locations for each bus agency
    */
    fetch() {
        this.props.agencies.forEach(a => this.props.actions.getLocations(a.tag));
    }

    /**
     * D3 selected reference to the group
     * @type {Object}
     */
    get group() {
        return d3.select(this._group);
    }

    render() {
        return <g ref={g => this._group = g} className={`layer vehicle ${this.props.type}`} />;
    }
}


const mapStateToProps = state => ({
    vehicles: state.Vehicles.vehicles,
    agencies: state.Agencies.agencies,
    routes: state.Routes.filtered
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getAgencies: Agencies.get,
        getLocations: Agencies.getLocations
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleLayer);
