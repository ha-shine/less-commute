import {connect} from 'react-redux';
import TopBar from '../components/TopBar';
import {StoreState} from '../types/index';
/**
 * Created by shine on 10/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
    };
}

export default connect(mapStateToProps, {})(TopBar);