import {connect, Dispatch} from 'react-redux';
import {hideTopbarDropdownMenu, showTopbarDropdownMenu} from '../actions/index';
import TopBar from '../components/TopBar';
import {StoreState} from '../types/index';
/**
 * Created by shine on 10/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        showTopbarDropdownMenu: s.showTopbarDropdownMenu
    };
}
function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onShowTopbarDropdownMenu: () => { d(showTopbarDropdownMenu()); },
        onHideTopbarDropdownMenu: () => { d(hideTopbarDropdownMenu()); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);