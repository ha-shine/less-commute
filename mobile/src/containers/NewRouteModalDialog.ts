import {connect, Dispatch} from 'react-redux';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {chooseAdditionalAddress, clearAdditionalAddress, hideModal, showModal} from '../actions/index';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../components/NewRouteModalDialog';
/**
 * Created by shine on 6/7/2017.
 */
function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onChooseAdditionalAddress: (a: AutocompletePrediction) => d(chooseAdditionalAddress(a)),
        onClearAdditionalAddress: () => d(clearAdditionalAddress()),
        onHideModal: () => d(hideModal()),
        onShowNextStage: () => d(showModal(CurrentModal.NewRouteSecondModal))
    };
}
export default connect(null, mapDispatchToProps)(NewRouteModalDialog);