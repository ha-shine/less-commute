import * as React from 'react';
import LargeModalDialog from './LargeModalDialog';
import LoadingAnimationModalContent from './LoadingAnimationModalContent';
import './RouteSelectModal.css';
import ModalOverlayContainer from './ModalOverlayContainer';

export interface Props {
    isFetching: boolean;
    sourceName: string;
    destinationName: string;
}
export default function RouteSelectModalDialog(p: Props) {
    if (p.isFetching) {
        return (
            <ModalOverlayContainer>
                <LargeModalDialog>
                    <LoadingAnimationModalContent/>
                </LargeModalDialog>
            </ModalOverlayContainer>
        );
    }
    return (
        <ModalOverlayContainer>
            <LargeModalDialog>
                <div className="modal-content route-select-modal-content">
                    <div className="modal-header">
                        {p.sourceName}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.destinationName}
                    </div>
                    <div className="modal-body">
                        Testing
                    </div>
                </div>
                <div className="modal-content route-select-modal-content">
                    <div className="modal-header">
                        {p.destinationName}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.sourceName}
                    </div>
                    <div className="modal-body">
                        Testing
                    </div>
                </div>
            </LargeModalDialog>
        </ModalOverlayContainer>
    );
}