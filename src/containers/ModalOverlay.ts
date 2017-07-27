import {StoreState} from '../types/index';
import {connect} from 'react-redux';
import ModalOverlay from '../components/ModalOverlay';
/**
 * Created by shine on 1/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        currentModal: s.currentModal
    };
}

export default connect(mapStateToProps)(ModalOverlay);