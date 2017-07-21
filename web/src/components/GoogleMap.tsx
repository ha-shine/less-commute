import * as React from 'react';
import './GoogleMap.css';

export default class GoogleMap extends React.Component<{}, {}> {
    private map: HTMLDivElement | null;
    componentDidMount() {
        this.loadMap();
    }
    loadMap() {
        let map = new google.maps.Map(this.map, {
            zoom: 14,
            center: {lat: -25.363, lng: 131.044}
        });
        map;
    }
    render() {
        return (
            <div className="google-map" ref={(map) => this.map = map}>
                Loading map
            </div>
        )
    }
}