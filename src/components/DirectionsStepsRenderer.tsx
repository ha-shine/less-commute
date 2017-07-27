import * as React from 'react';
import DirectionsStep = google.maps.DirectionsStep;
import TravelMode = google.maps.TravelMode;
import TransitLine = google.maps.TransitLine;
import './DirectionsStepsRenderer.css';
const uuidv4 = require('uuid/v4');

interface Props {
    steps: DirectionsStep[];
}
export default class DirectionsStepsRenderer extends React.Component<Props, {}> {
    render() {
        const components: object[] = [];
        this.props.steps.forEach((x, index) => {
            if (x.travel_mode === TravelMode.WALKING) {
                components.push(<Walking key={uuidv4()}/>);
            } else if (x.travel_mode === TravelMode.TRANSIT) {
                if (x.transit.line.vehicle.type.toString() === 'BUS') {
                    components.push(<TransitBus {...x.transit.line} key={uuidv4()}/>);
                } else {
                    components.push(<TransitSubway {...x.transit.line} key={uuidv4()}/>);
                }
            }

            if (index < this.props.steps.length - 1) {
                components.push(<DirectionRightArrow key={uuidv4()}/>);
            }
        });
        return (
            <div className="directions-steps-render">
                {components}
            </div>
        );
    }
}

const Walking = () => {
    return (
        <span className="ion-android-walk"/>
    );
};

const TransitSubway = (p: TransitLine) => {
    const style = {
        backgroundColor: p.color
    };
    return (
        <span className="transit">
            <span className="ion-android-subway" style={style}/>
        </span>
    );
};

const TransitBus = (p: TransitLine) => {
    return (
        <span className="transit">
            <span className="ion-android-bus"/>
            <span className="bus-no">{p.short_name}</span>
        </span>
    );
};

const DirectionRightArrow = () => {
    return (
        <span className="ion-chevron-right"/>
    );
};