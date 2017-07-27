import * as React from 'react';
import './LargerModalDialog.css';

export default class LargeModalDialog extends React.Component<{}, {}> {
    render() {
        return (
            <div className="modal-dialog modal-lg larger">
                {this.props.children}
            </div>
        );
    }
}