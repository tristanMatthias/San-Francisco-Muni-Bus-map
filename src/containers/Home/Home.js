import React from 'react';
import {connect} from 'react-redux';

import {Map, RouteFilter} from 'components';

/**
 * @classdesc Container for the whole app
*/
export class PageHome extends React.Component {
    render() {
        return <div className="page">
            <aside>
                <h1>San Francisco Muni Bus</h1>
                <RouteFilter />
            </aside>
            <Map />
        </div>;
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
