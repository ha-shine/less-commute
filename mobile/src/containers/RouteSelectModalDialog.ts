import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import RouteSelectModalDialog from '../components/RouteSelectModalDialog';
import {
    addAdditionalRoutes,
    changePage, clearAdditionalAddress, clearRouteFromDestination, clearRouteFromSource,
    clearSelectedRoutes,
    confirmBaseRoute,
    hideModal, SelectRouteAction, selectRouteFromDestination, selectRouteFromSource
} from '../actions/index';
import {CurrentModal, CurrentPage} from '../constants/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
/**
 * Created by shine on 1/7/2017.
 */
function mapStateToProps(s: StoreState) {
    let source = s.selectedHomeAddress;
    if (s.currentModal === CurrentModal.NewRouteSecondModal) {
        source = s.additionalAddress;
    }
    return {
        currentModal: s.currentModal,
        isFetching: s.routesFromDestination.length === 0 && s.routesFromSource.length === 0,
        source: source as AutocompletePrediction,
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
            d(clearRouteFromSource());
            d(clearRouteFromDestination());
            d(clearSelectedRoutes());
            d(clearAdditionalAddress());
        },
        onConfirmBaseRoutes: (routes: DirectionsRoutePair) => {
            d(confirmBaseRoute(routes));
            d(changePage(CurrentPage.RouteCompareMenu));
        },
        onConfirmAdditionalRoutes: (routes: DirectionsRoutePair) => {
            d(addAdditionalRoutes(routes));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteSelectModalDialog);
