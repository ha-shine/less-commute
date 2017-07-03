import {StoreState} from '../types/index';
import {connect} from 'react-redux';
import {BodyContainer} from '../components/BodyContainer';
/**
 * Created by shine on 3/7/2017.
 */
function mapStateToProps(state: StoreState) {
    return {
        currentPage: state.currentPage
    };
}

export default connect(mapStateToProps)(BodyContainer);