/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import './TopBar.css';
import TopBarDropdownMenu from '../containers/TopBarDropdownMenu';

interface Props {
    showTopbarDropdownMenu: boolean;
    onShowTopbarDropdownMenu: () => void;
    onHideTopbarDropdownMenu: () => void;
}
export default class TopBar extends React.Component<Props, {}> {
    onClickDetailsButton() {
        console.log(this.props.showTopbarDropdownMenu);
        if (this.props.showTopbarDropdownMenu) {
            console.log('Hide');
            this.props.onHideTopbarDropdownMenu();
        } else {
            console.log('Show');
            this.props.onShowTopbarDropdownMenu();
        }
    }
    render() {
        return (
            <nav className="navbar navbar-default topbar">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">OptimizeCommute</a>
                        <a
                            className="navbar-brand navbar-details pull-right"
                            onClick={() => this.onClickDetailsButton()}
                        >
                            <span className="ion-android-more-vertical" />
                            <TopBarDropdownMenu />
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}