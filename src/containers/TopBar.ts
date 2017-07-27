import {connect, Dispatch} from 'react-redux';
import TopBar from '../components/TopBar';
import {StoreState} from '../types/index';
import {showModal} from "../actions/index";
import {CurrentModal} from "../constants/index";
/**
 * Created by shine on 10/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
    };
}
function mapDispatchToProps(dispatch: Dispatch<object>) {
    return {
        showInformationModal: () => { dispatch(showModal(CurrentModal.InformationModal)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);