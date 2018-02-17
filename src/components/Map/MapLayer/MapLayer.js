import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as d3 from 'd3';


import {MAP_TYPES} from 'constants';

/**
 * @classdesc MapLayer is a single layer of the map. It's a static svg group
 * with the map data plotted and scaled according to the map scale
*/
class MapLayer extends React.Component {
    static get propTypes() {
        return {
            type: PropTypes.oneOf(MAP_TYPES).isRequired
        };
    }


    componentDidUpdate(newProps) {
        // Update the svg if the path changes
        if (newProps.path != this.props.path) this.renderLayer();
    }

    /**
     * D3 selected reference to the group
     * @type {Object}
     */
    get group() {
        return d3.select(this._group);
    }

    render() {
        return <g ref={g => this._group = g} className={`layer ${this.props.type}`} />;
    }


    /**
     * Update the svg path (scale, zoom, etc)
     */
    renderLayer() {
        if (!this.props.data.features) return;

        const path = this.group.selectAll('path')
            .data(this.props.data.features);

        path.enter()
            .append('path')
            .merge(path)
            .attr('d', this.props.path);
    }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapLayer);
