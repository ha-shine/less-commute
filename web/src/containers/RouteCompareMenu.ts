import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {RouteCompareMenu} from '../components/RouteCompareMenu';
import {changeAddressSortType, collapseRoute, expandRoute, setDays, showModal} from '../actions/index';
import {AddressSortType, CurrentModal} from '../constants/index';
import * as _ from 'lodash';
/**
 * Created by shine on 5/7/2017.
 */
function mapStateToProps(s: StoreState) {
    let additionalRoutes = s.additionalRoutes;
    switch (s.currentAddressSortType) {
        case AddressSortType.FARE:
            additionalRoutes = _.sortBy(additionalRoutes, (x) => {
                return x.routeFromSource.totalFare + x.routeFromDestination.totalFare;
            });
            break;
        case AddressSortType.DURATION:
            additionalRoutes = _.sortBy(additionalRoutes, (x) => {
                return x.routeFromSource.duration + x.routeFromDestination.duration;
            });
            break;
        default:
            break;
    }

    return {
        days: s.days,
        additionalRoutes: additionalRoutes,
        expandedRouteId: s.expandedRouteId
    };
}

function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onClickAddRouteBtn: () => d(showModal(CurrentModal.NewRouteModal)),
        onExpandRoute: (routeId: string) => d(expandRoute(routeId)),
        onCollapseRoute: () => d(collapseRoute()),
        onDeleteRoute: (pairId: string) => d(showModal(CurrentModal.RouteDeleteConfirmModal)),
        onChangeRoute: () => d(showModal(CurrentModal.ChangeRouteModal)),
        setDays: (days: number) => d(setDays(days)),
        setAddressSortType: (sortType: AddressSortType) => d(changeAddressSortType(sortType))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteCompareMenu);