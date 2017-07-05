import {connect, Dispatch} from 'react-redux';
import {
    chooseAdditionalAddress, clearAdditionalAddress, fetchRouteFromDestination, fetchRouteFromSource, hideModal,
    showModal
} from '../actions/index';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../components/NewRouteModalDialog';
import {StoreState} from '../types/index';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
/**
 * Created by shine on 6/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        workAddress: s.selectedWorkAddress
    };
}
function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onHideModal: () => d(hideModal()),
        onShowNextStage: () => d(showModal(CurrentModal.NewRouteSecondModal)),
        chooseAdditionalAddress: (a: AutocompletePrediction) => d(chooseAdditionalAddress(a)),
        clearAdditionalAddress: () => d(clearAdditionalAddress()),
        fetchRoutesFromSource: (routes: IdentifiableDirectionsRoute[]) => d(fetchRouteFromSource(routes)),
        fetchRoutesFromDestination: (routes: IdentifiableDirectionsRoute[]) => d(fetchRouteFromDestination(routes))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRouteModalDialog);