import * as React from 'react';
import DirectionsStepsRenderer from './DirectionsStepsRenderer';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
const uuidv4 = require('uuid/v4');

export interface Props {
    routes: IdentifiableDirectionsRoute[];
}
export default class RouteSelectModalBody extends React.Component<Props, {}> {
    render() {
        return (
            <div className="modal-body">
                <div className="row title-row">
                    <div className="col-xs-8"/>
                    <div className="col-xs-2">$</div>
                    <div className="col-xs-2">Time</div>
                </div>
                {this.props.routes.map((route, index) => {
                    console.log(route);
                    return (
                        <div className="row selectable-row" key={uuidv4()}>
                            <div className="col-xs-8">
                                <DirectionsStepsRenderer steps={route.route.legs[0].steps}/>
                            </div>
                            <div className="col-xs-2"/>
                            <div className="col-xs-2"/>
                        </div>
                    );
                })}
            </div>
        );
    }
}