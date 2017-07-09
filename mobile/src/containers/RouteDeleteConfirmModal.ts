import {StoreState} from '../types/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import {connect, Dispatch} from 'react-redux';
import {hideModal, removeAdditionalRoutes} from '../actions/index';
import RouteDeleteConfirmModal from '../components/RouteDeleteConfirmModal';
/**
 * Created by shine on 9/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        selectedDirectionsPair: s.additionalRoutes.find(x => x.id === s.expandedRouteId) as DirectionsRoutePair
    };
}
function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onCloseModal: () => d(hideModal()),
        onDeleteRoute: (pairId: string) => d(removeAdditionalRoutes(pairId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDeleteConfirmModal);