/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import './TopBar.css';

interface Props {
}
export default class TopBar extends React.Component<Props, {}> {
    render() {
        return (
            <nav className="navbar navbar-default topbar">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">OptimizeCommute</a>
                    </div>
                    <div className="navbar-right">
                        <span className="ion-ios-information-outline details pull-right"/>
                    </div>
                </div>
            </nav>
        );
    }
}