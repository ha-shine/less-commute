import {connect, Dispatch} from 'react-redux';
import ResetConfirmModal from '../components/ResetConfirmModal';
import { 
    hideModal, removeWorkAddress, 
    removeHomeAddress, clearAdditionalRoutes, 
    clearBaseRoute 
} from '../actions/index';
/**
 * Created by shine on 9/7/2017.
 */
function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onConfirm: () => {
            d(removeWorkAddress());
            d(removeHomeAddress());
            d(clearAdditionalRoutes());
            d(clearBaseRoute());
        },
        onCloseModal: () => d(hideModal())
    };
}

export default connect(null, mapDispatchToProps)(ResetConfirmModal);