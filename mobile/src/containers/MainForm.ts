import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {
    changePage,
    removeTemporaryHomeAddress, selectHomeAddress,
    selectWorkAddress, setDays, setTemporaryHomeAddress, showModal
} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import MainForm from '../components/MainForm';
import * as constants from '../constants/index';
import { CurrentModal } from '../constants/index';
/**
 * Created by Shine on 6/29/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        selectedHomeAddress: s.selectedHomeAddress,
        selectedWorkAddress: s.selectedWorkAddress,
        baseRoutes: s.baseRoutes,
        days: s.days,
        temporaryHomeAddress: s.temporaryHomeAddress
    };
}
function mapDispatchToProps(dispatch: Dispatch<object>) {
    return {
        onSelectHomeAddress: (a: AutocompletePrediction) => dispatch(selectHomeAddress(a)),
        onSelectWorkAddress: (a: AutocompletePrediction) => dispatch(selectWorkAddress(a)),
        onShowModal: (s: constants.CurrentModal) => dispatch(showModal(s)),
        setDays: (days: number) => dispatch(setDays(days)),
        onClickReset: () => dispatch(showModal(CurrentModal.ResetConfirmModal)),
        setTemporaryHomeAddress: (address: AutocompletePrediction) => { dispatch(setTemporaryHomeAddress(address)); },
        removeTemporaryHomeAddress: () => { dispatch(removeTemporaryHomeAddress()); },
        changePage: (page: constants.CurrentPage) => { dispatch(changePage(page)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);