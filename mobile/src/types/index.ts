import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import DirectionsRoute = google.maps.DirectionsRoute;
import * as constants from '../constants/index';
/**
 * Created by Shine on 6/29/2017.
 */
export interface StoreState {
    selectedHomeAddress: AutocompletePrediction | null;
    selectedWorkAddress: AutocompletePrediction | null;
    showModal: boolean;
    routesFromSource: DirectionsRoute[];
    routesFromDestination: DirectionsRoute[];
    currentModal: constants.CurrentModal;
}