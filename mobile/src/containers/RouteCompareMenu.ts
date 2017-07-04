import {StoreState} from '../types/index';
import {connect} from 'react-redux';
import {RouteCompareMenu} from '../components/RouteCompareMenu';
/**
 * Created by shine on 5/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        baseRoutes: s.baseRoutes,
        days: s.days
    };
}

export default connect(mapStateToProps)(RouteCompareMenu);