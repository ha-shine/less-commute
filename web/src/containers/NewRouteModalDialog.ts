import {connect, Dispatch} from 'react-redux';
import {
    chooseAdditionalAddress, clearAdditionalAddress, hideModal, showModal
} from '../actions/index';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../components/NewRouteModalDialog';
import {StoreState} from '../types/index';
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
        clearAdditionalAddress: () => d(clearAdditionalAddress())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRouteModalDialog);