import * as React from 'react';
import * as constants from '../constants/index';

const enhanceWithClickOutside = require('react-click-outside');

interface Props {
    currentModal: constants.CurrentModal;
    showTopbarDropdownMenu: boolean;
    onHideMenu: () => void;
}
class TopBarDropdownMenu extends React.Component<Props, {}> {
    handleClickOutside() {
        this.props.onHideMenu();
    }

    render() {
        if (this.props.showTopbarDropdownMenu) {
            return (
                <ul className="topbar-dropdown">
                    <li className="menu-items">Hello</li>
                    <li className="menu-items">Hello</li>
                    <li className="menu-items">Hello</li>
                </ul>
            );
        } else {
            return null;
        }
    }
}

export default enhanceWithClickOutside(TopBarDropdownMenu);