import {StoreState} from '../types/index';
import {connect} from 'react-redux';
import RouteSelectModalDialog from '../components/RouteSelectModalDialog';
/**
 * Created by shine on 1/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        isFetching: s.routesFromDestination.length === 0 && s.routesFromSource.length === 0,
        sourceName: 'Home',
        destinationName: 'Work',
        routesFromSource: s.routesFromSource,
        routesFromDestination: s.routesFromDestination
    };
}

export default connect(mapStateToProps)(RouteSelectModalDialog);