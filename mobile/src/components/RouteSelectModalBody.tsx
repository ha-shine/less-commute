import * as React from 'react';
import DirectionsStepsRenderer from './DirectionsStepsRenderer';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
const uuidv4 = require('uuid/v4');

interface Props {
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
                            <div className="col-xs-2 text-center values">
                                <div className="duration-value">{route.duration}</div>
                                <div className="duration-id">min</div>
                            </div>
                            <div className="col-xs-2 text-center values">
                                <div className="fare-value">{route.totalFare.toFixed(2)}</div>
                                <div className="fare-id">SGD</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}