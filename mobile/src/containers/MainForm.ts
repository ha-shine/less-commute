import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {
    removeHomeAddress, removeWorkAddress, selectHomeAddress,
    selectWorkAddress, setDays, showModal
} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import MainForm from '../components/MainForm';
import * as constants from '../constants/index';
/**
 * Created by Shine on 6/29/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        selectedHomeAddress: s.selectedHomeAddress,
        selectedWorkAddress: s.selectedWorkAddress
    };
}
function mapDispatchToProps(dispatch: Dispatch<object>) {
    return {
        onSelectHomeAddress: (a: AutocompletePrediction) => dispatch(selectHomeAddress(a)),
        onRemoveHomeAddress: () => dispatch(removeHomeAddress()),
        onSelectWorkAddress: (a: AutocompletePrediction) => dispatch(selectWorkAddress(a)),
        onRemoveWorkAddress: () => dispatch(removeWorkAddress()),
        onShowModal: (s: constants.CurrentModal) => dispatch(showModal(s)),
        setDays: (days: number) => dispatch(setDays(days))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);