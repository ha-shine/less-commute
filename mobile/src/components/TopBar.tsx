/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import './TopBar.css';
import TopBarDropdownMenu from '../containers/TopBarDropdownMenu';

interface Props {
    showTopbarDropdownMenu: boolean;
}
export default class TopBar extends React.Component<Props, {}> {
    onClickDetailsButton() {
        console.log(this.props.showTopbarDropdownMenu);
    }
    render() {
        return (
            <nav className="navbar navbar-default topbar">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">OptimizeCommute</a>
                        <TopBarDropdownMenu/>
                    </div>
                </div>
            </nav>
        );
    }
}