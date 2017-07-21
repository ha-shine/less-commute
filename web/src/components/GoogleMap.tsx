import * as React from 'react';
import './GoogleMap.css';
import GeocoderStatus = google.maps.GeocoderStatus;
import DirectionsRoute = google.maps.DirectionsRoute;

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
            zoom: 11,
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
                const polyline = new google.maps.Polyline({
                    path: step.path,
                    strokeOpacity: 1,
                    strokeColor: '#555',
                    strokeWeight: 6
                });
                polyline.setMap(this.gmap);
                polylines.push(polyline);
            });
            this.setState({
                sourceLines: polylines
            });
        }
    }
    render() {
        return (
            <div className="google-map" ref={(map) => this.map = map}>
                Loading map
            </div>
        );
    }
}