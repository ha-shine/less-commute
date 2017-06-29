import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {
    removeHomeAddress, removeWorkAddress, SelectedAddressAction, selectHomeAddress,
    selectWorkAddress
} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import MainForm from '../components/MainForm';
/**
 * Created by Shine on 6/29/2017.
 */
export function mapStateToProps(s: StoreState) {
    return {
        selectedHomeAddress: s.selectedHomeAddress,
        selectedWorkAddress: s.selectedWorkAddress
    };
}

export function mapDispatchToProps(dispatch: Dispatch<SelectedAddressAction>) {
    return {
        onSelectHomeAddress: (a: AutocompletePrediction) => dispatch(selectHomeAddress(a)),
        onRemoveHomeAddress: () => dispatch(removeHomeAddress()),
        onSelectWorkAddress: (a: AutocompletePrediction) => dispatch(selectWorkAddress(a)),
        onRemoveWorkAddress: () => dispatch(removeWorkAddress())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);