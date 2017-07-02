import * as React from 'react';
import DirectionsStepsRenderer from './DirectionsStepsRenderer';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
const uuidv4 = require('uuid/v4');

export interface Props {
    routes: IdentifiableDirectionsRoute[];
    onSelectRoute: (id: string) => void;
    selectedRouteId: string;
}
export default class RouteSelectModalBody extends React.Component<Props, {}> {
    render() {
        return (
            <div className="modal-body">
                {this.props.routes.map((route, index) => {
                    let className = 'row selectable-row';
                    className += (this.props.selectedRouteId === route.id) ? ' selected' : '';
                    return (
                        <div
                            className={className}
                            key={uuidv4()}
                            onClick={() => this.props.onSelectRoute(route.id)}
                        >
                            <div className="col-xs-8">
                                <DirectionsStepsRenderer steps={route.route.legs[0].steps}/>
                            </div>
                            <div className="col-xs-2">{route.duration}</div>
                            <div className="col-xs-2">{route.totalFare.toPrecision(3)}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}