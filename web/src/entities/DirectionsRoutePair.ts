import IdentifiableDirectionsRoute from './IdentifiableDirectionsRoute';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
const uuidv4 = require('uuid/v4');
/**
 * Created by shine on 4/7/2017.
 */
export default class DirectionsRoutePair {
    routeFromSource: IdentifiableDirectionsRoute;
    routeFromDestination: IdentifiableDirectionsRoute;
    address: AutocompletePrediction;
    id: string;
    constructor(address: AutocompletePrediction,
                source: IdentifiableDirectionsRoute, dstn: IdentifiableDirectionsRoute) {
        this.id = uuidv4();
        this.address = address;
        this.routeFromSource = source;
        this.routeFromDestination = dstn;
    }
}