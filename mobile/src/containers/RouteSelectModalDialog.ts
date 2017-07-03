import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import RouteSelectModalDialog from '../components/RouteSelectModalDialog';
import {
    clearSelectedRoutes,
    confirmBaseRoute,
    hideModal, SelectRouteAction, selectRouteFromDestination, selectRouteFromSource,
    toggleModal
} from '../actions/index';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
/**
 * Created by shine on 1/7/2017.
 */
export interface StateProps {
    isFetching: boolean;
    sourceName: string;
    destinationName: string;
    routesFromSource: IdentifiableDirectionsRoute[];
    routesFromDestination: IdentifiableDirectionsRoute[];
    selectedRouteIdFromSource: string;
    selectedRouteIdFromDestination: string;
}
function mapStateToProps(s: StoreState): StateProps {
    return {
        isFetching: s.routesFromDestination.length === 0 && s.routesFromSource.length === 0,
        sourceName: 'Home',
        destinationName: 'Work',
        routesFromSource: s.routesFromSource,
        routesFromDestination: s.routesFromDestination,
        selectedRouteIdFromSource: s.selectedRouteIdFromSource,
        selectedRouteIdFromDestination: s.selectedRouteIdFromDestination
    };
}
export interface DispatchProps {
    onSelectRouteFromSource: (s: string) => void;
    onSelectRouteFromDestination: (s: string) => void;
    onCloseModal: () => void;
    onConfirmBaseRoutes: (routes: IdentifiableDirectionsRoute[]) => void;
}
function mapDispatchToProps(d: Dispatch<SelectRouteAction>): DispatchProps {
    return {
        onSelectRouteFromSource: (s: string) => d(selectRouteFromSource(s)),
        onSelectRouteFromDestination: (s: string) => d(selectRouteFromDestination(s)),
        onCloseModal: () => {
            d(toggleModal());
            d(hideModal());
            d(clearSelectedRoutes());
        },
        onConfirmBaseRoutes: (routes: IdentifiableDirectionsRoute[]) => d(confirmBaseRoute(routes))
    };
}

function mergeProps(state: StateProps, dispatch: DispatchProps) {
    return {
        ...state,
        ...dispatch,
        onClickConfirm: () => {
            const routeFromSource = state.routesFromSource.find((x) => x.id === state.selectedRouteIdFromSource);
            const routeFromDst = state.routesFromDestination.find((x) => x.id === state.selectedRouteIdFromDestination);
            const selectedRoutes = [routeFromSource].concat([routeFromDst]) as IdentifiableDirectionsRoute[];
            dispatch.onConfirmBaseRoutes(selectedRoutes);
            dispatch.onCloseModal();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RouteSelectModalDialog);
