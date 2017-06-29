import * as React from 'react';
import './ModalOverlay.css';

export default class ModalOverlay extends React.Component<{}, {}> {
    render() {
        return (
            <div className="modal-overlay">
                {this.props.children}
            </div>
        );
    }
}