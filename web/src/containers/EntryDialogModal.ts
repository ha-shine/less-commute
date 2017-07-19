import {connect, Dispatch} from 'react-redux';
import {hideModal, selectWorkAddress} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import EntryDialogModal from '../components/EntryDialogModal';
/**
 * Created by Shine on 7/14/2017.
 */
function mapDispatchToProps(dispatch: Dispatch<object>) {
    return {
        setWorkAddress: (address: AutocompletePrediction) => { dispatch(selectWorkAddress(address)); },
        closeModal: () => { dispatch(hideModal()); }
    };
}

export default connect(null, mapDispatchToProps)(EntryDialogModal);