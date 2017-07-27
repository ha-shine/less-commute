import * as React from 'react';
import './ModalOverlayContainer.css';

export default class ModalOverlayContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="modal-overlay">
                {this.props.children}
            </div>
        );
    }
}