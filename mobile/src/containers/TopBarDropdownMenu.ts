import {StoreState} from '../types/index';
import {CurrentPage} from '../constants/index';
import {connect, Dispatch} from 'react-redux';
import {hideTopbarDropdownMenu, showTopbarDropdownMenu, changePage} from '../actions/index';
import TopBarDropdownMenu from '../components/TopBarDropdownMenu';
/**
 * Created by shine on 10/7/2017.
 */
function mapStateToProps(s: StoreState) {
    return {
        currentPage: s.currentPage,
        showTopbarDropdownMenu: s.showTopbarDropdownMenu,
        baseRoutes: s.baseRoutes
    };
}

function mapDispatchToProps(d: Dispatch<object>) {
    return {
        onHideMenu: () => { d(hideTopbarDropdownMenu()); },
        onShowMenu: () => { d(showTopbarDropdownMenu()); },
        gotoMainMenu: () => { d(changePage(CurrentPage.MainMenu)); },
        gotoTable: () => { d(changePage(CurrentPage.RouteCompareMenu)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarDropdownMenu);