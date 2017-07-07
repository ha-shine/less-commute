import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {RouteCompareMenu} from '../components/RouteCompareMenu';
import {showModal} from '../actions/index';
import {CurrentModal} from '../constants/index';
/**
 * Created by shine on 5/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        baseRoutes: s.baseRoutes,
        days: s.days,
        additionalRoutes: s.additionalRoutes
    };
}

function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onClickAddRouteBtn: () => d(showModal(CurrentModal.NewRouteModal))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCompareMenu);