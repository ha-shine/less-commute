import DirectionsRoute = google.maps.DirectionsRoute;
import TravelMode = google.maps.TravelMode;
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
        this.totalFare = 0;
        route.legs[0].steps.forEach((step) => {
            if (step.travel_mode !== TravelMode.WALKING) {
                console.log(step);
                console.log(services.calculateFare(step));
                this.totalFare += services.calculateFare(step);
            }
        });
    }
}