import * as React from 'react';
import * as constants from '../constants/index';

const enhanceWithClickOutside = require('react-click-outside');

interface Props {
    currentModal: constants.CurrentModal;
    showTopbarDropdownMenu: boolean;
    onHideMenu: () => void;
    onShowMenu: () => void;
}
class TopBarDropdownMenu extends React.Component<Props, {}> {
    onClickDetailsButton() {
        if (this.props.showTopbarDropdownMenu) {
            this.props.onHideMenu();
        } else {
            this.props.onShowMenu();
        }
    }

    handleClickOutside() {
        this.props.onHideMenu();
    }

    render() {
        let list = null;
        if (this.props.showTopbarDropdownMenu) {
            list = (
                <ul className="topbar-dropdown">
                    <li className="menu-items">Hello</li>
                    <li className="menu-items">Hello</li>
                    <li className="menu-items">Hello</li>
                </ul>
            );
        }
        return (
            <a
                className="navbar-brand navbar-details pull-right"
                onClick={() => this.onClickDetailsButton()}
            >
                <span className="ion-android-more-vertical" />
                {list}
            </a>
        );
    }
}

export default enhanceWithClickOutside(TopBarDropdownMenu);