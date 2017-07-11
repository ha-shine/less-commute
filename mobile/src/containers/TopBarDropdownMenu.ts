import {StoreState} from '../types/index';
import {connect, Dispatch} from 'react-redux';
import {hideTopbarDropdownMenu, showTopbarDropdownMenu} from '../actions/index';
import TopBarDropdownMenu from '../components/TopBarDropdownMenu';
/**
 * Created by shine on 10/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        currentModal: s.currentModal,
        showTopbarDropdownMenu: s.showTopbarDropdownMenu
    };
}

function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onHideMenu: () => { d(hideTopbarDropdownMenu()); },
        onShowMenu: () => { d(showTopbarDropdownMenu()); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarDropdownMenu);