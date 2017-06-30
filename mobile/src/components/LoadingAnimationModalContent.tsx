import * as React from 'react';

export default function LoadingAnimationModalContent() {
    return (
        <div className="modal-content">
            <div className="loading-div text-center">
                <h4>
                    Loading
                    <span className="loading"/>
                    <span className="loading"/>
                    <span className="loading"/>
                </h4>
            </div>
        </div>
    );
}