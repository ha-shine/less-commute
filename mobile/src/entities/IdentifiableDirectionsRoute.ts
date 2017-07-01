import DirectionsRoute = google.maps.DirectionsRoute;
const uuidv4 = require('uuid/v4');
/**
 * Created by shine on 2/7/2017.
 */
export default class IdentifiableDirectionsRoute {
    route: DirectionsRoute;
    id: string;
    constructor(route: DirectionsRoute) {
        this.route = route;
        this.id = uuidv4();
    }
}