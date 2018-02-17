import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import {URL_BASENAME} from 'constants';
import {PAGE_HOME} from 'containers';


const ROUTES = [
    {path: '/', component: PAGE_HOME}
];

/**
 * @classdesc A very basic router for the app. Could be extended to include more
 * pages.
*/
export default class Router extends React.Component {
    static get defaultProps() {
        return {
            base: URL_BASENAME
        };
    }

    render() {
        const {base} = this.props;

        return <BrowserRouter basename={base}>
            <Switch>
                {ROUTES.map(r => <Route {...r} key={r.path}/>)}
            </Switch>
        </BrowserRouter>;
    }
}
