import DirectionsRoute = google.maps.DirectionsRoute;
import * as services from '../services/index';
const uuidv4 = require('uuid/v4');
/**
 * Created by shine on 2/7/2017.
 */
export default class IdentifiableDirectionsRoute {
    route: DirectionsRoute;
    id: string;
    duration: number;
    totalFare: number;
    constructor(route: DirectionsRoute) {
        this.route = route;
        this.id = uuidv4();
        this.duration = Math.ceil(route.legs[0].duration.value / 60);
        this.totalFare = services.calculateFare(route.legs[0].steps);
    }
}