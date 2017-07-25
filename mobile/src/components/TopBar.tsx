/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import './TopBar.css';

interface Props {
    showInformationModal: () => void;
}
export default class TopBar extends React.Component<Props, {}> {
    render() {
        return (
            <nav className="navbar navbar-default topbar">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">LessCommute <small>Alpha</small></a>
                        <span
                            className="ion-ios-information-outline details pull-right"
                            onClick={this.props.showInformationModal}
                        />
                    </div>
                </div>
            </nav>
        );
    }
}