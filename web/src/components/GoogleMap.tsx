import * as React from 'react';
import './GoogleMap.css';
import GeocoderStatus = google.maps.GeocoderStatus;
import DirectionsRoute = google.maps.DirectionsRoute;
import DirectionsStep = google.maps.DirectionsStep;
import TravelMode = google.maps.TravelMode;

interface Props {
    centerId: string;
    shownRoute: DirectionsRoute | null;
}
interface State {
    sourceLines: google.maps.Polyline[];
}
export default class GoogleMap extends React.Component<Props, State> {
    private map: HTMLDivElement | null;
    private gmap: google.maps.Map;
    constructor(props: Props) {
        super(props);
        this.state = {
            sourceLines: []
        };
    }
    componentDidMount() {
        this.loadMap();
        this.centerMap();
        this.addLines(this.props.shownRoute);
    }
    componentWillReceiveProps(nextProps: Props) {
        this.clearLines();
        this.addLines(nextProps.shownRoute);
    }
    loadMap() {
        this.gmap = new google.maps.Map(this.map, {
            zoom: 12,
            center: {lat: 1.290270, lng: 103.851959},
            streetViewControl: false
        });
    }
    centerMap() {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'placeId': this.props.centerId}, (results, status) => {
            if (status === GeocoderStatus.OK) {
                if (results[0]) {
                    this.gmap.setZoom(12);
                    this.gmap.setCenter(results[0].geometry.location);
                }
            }
        });
    }
    clearLines() {
        this.state.sourceLines.forEach((polyline) => {
            polyline.setMap(null);
        });
        this.setState({
            sourceLines: []
        });
    }
    addLines(route: DirectionsRoute | null) {
        const directionsResult = route;
        if (directionsResult !== null) {
            let polylines: google.maps.Polyline[] = [];
            directionsResult.legs[0].steps.forEach((step) => {
                const options = this.getPolylineOptionsFromDirectionsStep(step);
                const polyline = new google.maps.Polyline();
                polyline.setOptions(options);
                polyline.setMap(this.gmap);
                polylines.push(polyline);
            });
            this.setState({
                sourceLines: polylines
            });
        }
    }
    getPolylineOptionsFromDirectionsStep(step: DirectionsStep) {
        let options: google.maps.PolylineOptions = {};
        options.path = step.path;
        options.strokeColor = '#666666';
        options.strokeOpacity = 1;
        options.strokeWeight = 6;

        if (step.travel_mode === TravelMode.WALKING) {
            const lineSymbol = {
                path: 'M 0.2, -0.2 0.2, 0.2',
                strokeOpacity: 1,
                scale: 4
            };
            options.icons = [{
                icon: lineSymbol,
                offset: '0',
                repeat: '9px'
            }];
            options.strokeOpacity = 0;
        } else if (step.travel_mode === TravelMode.TRANSIT) {
            if (step.transit.line.vehicle.type.toString() !== 'BUS') {
                options.strokeColor = step.transit.line.color;
            }
        }
        return options;
    }
    render() {
        return (
            <div className="google-map" ref={(map) => this.map = map}>
                Loading map
            </div>
        );
    }
}