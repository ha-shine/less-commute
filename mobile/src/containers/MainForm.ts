import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {
    fetchRouteFromDestination,
    fetchRouteFromSource,
    removeHomeAddress, removeWorkAddress, selectHomeAddress,
    selectWorkAddress, showModal, toggleModal
} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import MainForm from '../components/MainForm';
import DirectionsRoute = google.maps.DirectionsRoute;
import DirectionsResult = google.maps.DirectionsResult;
import {getGoogleDirection} from '../services/index';
import * as constants from '../constants/index';
import {CurrentModal} from '../constants/index';
/**
 * Created by Shine on 6/29/2017.
 */
interface StateProps {
    selectedHomeAddress: AutocompletePrediction| null;
    selectedWorkAddress: AutocompletePrediction| null;
}
function mapStateToProps(s: StoreState) {
    return {
        selectedHomeAddress: s.selectedHomeAddress,
        selectedWorkAddress: s.selectedWorkAddress
    };
}

interface DispatchProps {
    onSelectHomeAddress: (a: AutocompletePrediction) => void;
    onRemoveHomeAddress: () => void;
    onSelectWorkAddress: (a: AutocompletePrediction) => void;
    onRemoveWorkAddress: () => void;
    onReceiveRouteFromSource: (route: DirectionsRoute[]) => void;
    onReceiveRouteFromDestination: (route: DirectionsRoute[]) => void;
    onToggleModal: () => void;
    onShowModal: (s: constants.CurrentModal) => void;
}
function mapDispatchToProps(dispatch: Dispatch<object>) {
    return {
        onSelectHomeAddress: (a: AutocompletePrediction) => dispatch(selectHomeAddress(a)),
        onRemoveHomeAddress: () => dispatch(removeHomeAddress()),
        onSelectWorkAddress: (a: AutocompletePrediction) => dispatch(selectWorkAddress(a)),
        onRemoveWorkAddress: () => dispatch(removeWorkAddress()),
        onReceiveRouteFromSource: (route: DirectionsRoute[]) => dispatch(fetchRouteFromSource(route)),
        onReceiveRouteFromDestination: (route: DirectionsRoute[]) => dispatch(fetchRouteFromDestination(route)),
        onToggleModal: () => dispatch(toggleModal()),
        onShowModal: (s: constants.CurrentModal) => dispatch(showModal(s))
    };
}

function onClickCalculateButton(stateProps: StateProps, dispatchProps: DispatchProps) {
    dispatchProps.onToggleModal();
    dispatchProps.onShowModal(CurrentModal.BaseRoute);
    let departureTimeFromSource = new Date();
    let departureTimeFromDestination = new Date();
    departureTimeFromSource.setHours(8);
    departureTimeFromDestination.setHours(18);
    const callbackFromSource = (result: DirectionsResult) => {
        const directionsRoutes = result.routes;
        dispatchProps.onReceiveRouteFromSource(directionsRoutes);
    };
    const callbackFromDestination = (result: DirectionsResult) => {
        const directionsRoutes = result.routes;
        dispatchProps.onReceiveRouteFromDestination(directionsRoutes);
    };
    const source = stateProps.selectedHomeAddress as AutocompletePrediction;
    const destination = stateProps.selectedWorkAddress as AutocompletePrediction;
    getGoogleDirection(source, destination, departureTimeFromSource, callbackFromSource);
    getGoogleDirection(destination, source, departureTimeFromDestination, callbackFromDestination);
}

function mergeProps(stateProps: StateProps, dispatchProps: DispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        onClickCalculateBtn: () => onClickCalculateButton(stateProps, dispatchProps)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainForm);