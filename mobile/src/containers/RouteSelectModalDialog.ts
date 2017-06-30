import {StoreState} from '../types/index';
import {connect} from 'react-redux';
import RouteSelectModalDialog from '../components/RouteSelectModalDialog';
/**
 * Created by shine on 1/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        isFetching: s.routesFromDestination.length === 0 && s.routesFromSource.length === 0,
        sourceName: s.selectedHomeAddress !== null ? s.selectedHomeAddress.description : '',
        destinationName: s.selectedWorkAddress !== null ? s.selectedWorkAddress.description : ''
    };
}

export default connect(mapStateToProps)(RouteSelectModalDialog);