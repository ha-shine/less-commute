import * as React from 'react';
import LargeModalDialog from './LargeModalDialog';
import LoadingAnimationModalContent from './LoadingAnimationModalContent';
import './RouteSelectModal.css';
import ModalOverlayContainer from './ModalOverlayContainer';
import RouteSelectModalBody from './RouteSelectModalBody';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';

export interface Props {
    isFetching: boolean;
    sourceName: string;
    destinationName: string;
    routesFromSource: IdentifiableDirectionsRoute[];
    routesFromDestination: IdentifiableDirectionsRoute[];
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
                    <span className="ion-android-close close-button"/>
                    <div className="modal-header">
                        {p.sourceName}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.destinationName}
                    </div>
                    <RouteSelectModalBody routes={p.routesFromSource} />
                    <div className="modal-header">
                        {p.destinationName}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.sourceName}
                    </div>
                    <RouteSelectModalBody routes={p.routesFromDestination} />
                    <div className="modal-footer">
                        <button className="btn btn-default pull-right">
                            confirm <span className="ion-ios-checkmark-empty"/>
                        </button>
                    </div>
                </div>
            </LargeModalDialog>
        </ModalOverlayContainer>
    );
}