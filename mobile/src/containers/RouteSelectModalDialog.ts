import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import RouteSelectModalDialog from '../components/RouteSelectModalDialog';
import {
    changePage,
    clearSelectedRoutes,
    confirmBaseRoute,
    hideModal, SelectRouteAction, selectRouteFromDestination, selectRouteFromSource
} from '../actions/index';
import {CurrentPage} from '../constants/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
/**
 * Created by shine on 1/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        isFetching: s.routesFromDestination.length === 0 && s.routesFromSource.length === 0,
        source: s.selectedHomeAddress as AutocompletePrediction,
        destination: s.selectedWorkAddress as AutocompletePrediction,
        routesFromSource: s.routesFromSource,
        routesFromDestination: s.routesFromDestination,
        selectedRouteIdFromSource: s.selectedRouteIdFromSource,
        selectedRouteIdFromDestination: s.selectedRouteIdFromDestination
    };
}

function mapDispatchToProps(d: Dispatch<SelectRouteAction>) {
    return {
        onSelectRouteFromSource: (s: string) => d(selectRouteFromSource(s)),
        onSelectRouteFromDestination: (s: string) => d(selectRouteFromDestination(s)),
        onCloseModal: () => {
            d(hideModal());
            d(clearSelectedRoutes());
        },
        onConfirmBaseRoutes: (routes: DirectionsRoutePair) => {
            d(confirmBaseRoute(routes));
            d(changePage(CurrentPage.RouteCompareMenu));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectModalDialog);
