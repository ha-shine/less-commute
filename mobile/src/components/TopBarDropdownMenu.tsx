import * as React from 'react';
import * as constants from '../constants/index';
import { CurrentPage } from '../constants/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';

const enhanceWithClickOutside = require('react-click-outside');

interface Props {
    currentPage: constants.CurrentPage;
    showTopbarDropdownMenu: boolean;
    baseRoutes: DirectionsRoutePair | null;
    onHideMenu: () => void;
    onShowMenu: () => void;
    gotoMainMenu: () => void;
    gotoTable: () => void;
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
        let listItems = [];
        let list = null;

        if (this.props.showTopbarDropdownMenu) {
            if (this.props.currentPage === CurrentPage.MainMenu) {
                if (this.props.baseRoutes !== null) {
                    listItems.push(
                        <li key="comparison-table" onClick={() => this.props.gotoTable()}>Comparison Table</li>
                    );
                }
            }

            if (this.props.currentPage === CurrentPage.RouteCompareMenu) {
                listItems.push(
                    <li key="main-menu"  onClick={() => this.props.gotoMainMenu()}>Main Menu</li>
                );
            }

            listItems.push(
                <li key="about-me">About me</li>
            );

            list = (
                <ul className="topbar-dropdown">
                    {listItems}
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