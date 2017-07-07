import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import * as constants from '../constants/index';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
/**
 * Created by Shine on 6/29/2017.
 */
export interface StoreState {
    selectedHomeAddress: AutocompletePrediction | null;
    selectedWorkAddress: AutocompletePrediction | null;
    routesFromSource: IdentifiableDirectionsRoute[];
    routesFromDestination: IdentifiableDirectionsRoute[];
    selectedRouteIdFromSource: string;
    selectedRouteIdFromDestination: string;
    currentModal: constants.CurrentModal;
    baseRoutes: DirectionsRoutePair | null;
    currentPage: constants.CurrentPage;
    days: number;
    additionalAddress: AutocompletePrediction | null;
    additionalRoutes: DirectionsRoutePair[];
    expandedRouteId: string;
}