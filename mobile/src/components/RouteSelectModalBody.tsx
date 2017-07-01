import * as React from 'react';
import DirectionsRoute = google.maps.DirectionsRoute;
import DirectionsStepsRenderer from './DirectionsStepsRenderer';
const uuidv4 = require('uuid/v4');

export interface Props {
    routes: DirectionsRoute[];
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
                    return (
                        <div className="row selectable-row" key={uuidv4()}>
                            <div className="col-xs-8">
                                <DirectionsStepsRenderer steps={route.legs[0].steps}/>
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