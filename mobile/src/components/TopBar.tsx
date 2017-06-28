/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';

export default class TopBar extends React.Component<object, object> {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">CC</a>
                    </div>
                </div>
            </nav>
        );
    }
}