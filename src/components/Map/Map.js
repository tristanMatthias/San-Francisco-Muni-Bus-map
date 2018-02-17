import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import * as geo from 'd3-geo';
import _ from 'lodash';
import classnames from 'classnames';

import {Maps} from 'actions';
import {MAP_TYPES} from 'constants';


import MapLayer from './MapLayer';
import VehicleLayer from './VehicleLayer';

/**
 * @classdesc Map represents the main app, comprising of the individual map
 * layers, and the vehicles.
*/
export class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maps: {},
            scale: 100000000,
            largestLayer: null,
            zoom: 1,
            max: {}
        };
    }

    componentDidMount() {
        this.setState({maps: MAP_TYPES});

        // Window.addEventListener('mousewheel', this.zoom.bind(this));
        window.addEventListener('resize', () => this.update());

        MAP_TYPES.forEach(m => {
            this.props.actions.getMapData(m);
        });
    }

    componentWillUpdate(newProps) {
        if (this.props.maps != newProps.maps) this.update(newProps);
    }


    /**
     * Update the maximum scale used for all map layers (generates the projection)
     * @param {Object} props React component props
     */
    update(props = this.props) {
        const maps = {};
        let max = 1;

        /**
         * Generates the scales, boundaries, etc into the map variable
         * @param {String} m Map type
         */
        const generate = m => {
            const _m = props.maps[m];
            // If the map is not loaded, skip
            if (!_m.features) return;

            const r = maps[m] = {};

            // Find the center, and set the initial scale to 1
            r.center = geo.geoCentroid(_m);
            r.scale = 1;

            r.offset = [this.width / 2, this.height / 2];

            // Create the initial projection
            r.projection = geo.geoMercator()
                .scale(r.scale * this.state.zoom)
                .center(r.center)
                .translate(r.offset);

            // Create the path based on the projection
            r.path = geo.geoPath()
                .projection(r.projection);

            // Using the path determine the bounds of the current map and use
            // these to determine better values for the scale and translation
            const bounds = r.path.bounds(_m);
            const hscale = r.scale * this.width / (bounds[1][0] - bounds[0][0]);
            const vscale = r.scale * this.height / (bounds[1][1] - bounds[0][1]);
            r.scale = hscale < vscale ? hscale : vscale;


            r.offset = [
                this.width - (bounds[0][0] + bounds[1][0]) / 2,
                this.height - (bounds[0][1] + bounds[1][1]) / 2
            ];
        };

        /**
         * Update all the maps in the maps variable to the maximum scale etc
         * @param {String} m Map type
         */
        const update = m => {
            const zoom = 0.8;
            const _m = maps[m];
            if (!_m) return;
            const _max = maps[max];
            // New projection
            _m.projection = geo.geoMercator().center(_max.center)
                .scale(_max.scale * zoom)
                .translate(_max.offset);
            _m.path = _m.path.projection(_m.projection);
        };


        // Populate the map data first...
        MAP_TYPES.forEach(generate);
        // Find the biggest map based on the scale
        [max] = _.maxBy(Object.entries(maps), ([, o]) => o.scale);
        // Then update all the maps to match the scale
        MAP_TYPES.forEach(update);


        this.setState({maps, max: maps[max]});
    }


    /**
     * D3 selected reference to the svg
     * @type {Object}
     */
    get svg() {
        return d3.select(this._svg);
    }

    /**
     * Width of the component in pixels
     * @type {Integer}
     */
    get width() {
        if (this._svg) return this._svg.getBoundingClientRect().width;
    }

    /**
     * Width of the component in pixels
     * @type {Integer}
     */
    get height() {
        if (this._svg) return this._svg.getBoundingClientRect().height;
    }

    /**
     * Whether all the maps have loaded or not
     * @type {Boolean}
     */
    get loadedMaps() {
        return Object.values(this.props.loading)
            .filter(l => l === false).length === MAP_TYPES.length;
    }

    /**
     * Returns a loading overlay element
     * @type {ReactComponent}
     */
    get loading() {
        return <div className="loading" key="loading">Loading...</div>;
    }

    render() {
        const loaded = this.loadedMaps;
        const classes = {
            map: true,
            loaded
        };

        return [
            loaded ? null : this.loading,
            <svg className={classnames(classes)} ref={s => this._svg = s} key="map">
                {MAP_TYPES.map(m =>
                    <MapLayer
                        type={m}
                        key={m}
                        data={this.props.maps[m] || []}
                        path={(this.state.maps[m] || {}).path}
                    />
                )}
                {loaded
                    ? <VehicleLayer
                        projection={this.state.max.projection}
                        svg={this.svg}
                    />
                    : null
                }
            </svg>
        ];
    }
}

const mapStateToProps = state => ({
    maps: state.Maps.maps,
    loading: state.Maps.loading
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        getMapData: Maps.get
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
