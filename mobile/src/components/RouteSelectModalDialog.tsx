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
    selectedRouteIdFromSource: string;
    selectedRouteIdFromDestination: string;
    onSelectRouteFromSource: (s: string) => void;
    onSelectRouteFromDestination: (s: string) => void;
    onCloseModal: () => void;
    onConfirmBaseRoutes: (routes: IdentifiableDirectionsRoute[]) => void;
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
    const onClickConfirm = () => {
        const routeFromSource = p.routesFromSource.find((x) => x.id === p.selectedRouteIdFromSource);
        const routeFromDst = p.routesFromDestination.find((x) => x.id === p.selectedRouteIdFromDestination);
        const selectedRoutes = [routeFromSource].concat([routeFromDst]) as IdentifiableDirectionsRoute[];
        p.onConfirmBaseRoutes(selectedRoutes);
        p.onCloseModal();
    };
    return (
        <ModalOverlayContainer>
            <LargeModalDialog>
                <div className="modal-content route-select-modal-content">
                    <span className="ion-android-close close-button" onClick={p.onCloseModal}/>
                    <div className="modal-header">
                        {p.sourceName}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.destinationName}
                    </div>
                    <RouteSelectModalBody
                        routes={p.routesFromSource}
                        onSelectRoute={p.onSelectRouteFromSource}
                        selectedRouteId={p.selectedRouteIdFromSource}
                    />
                    <div className="modal-header">
                        {p.destinationName}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.sourceName}
                    </div>
                    <RouteSelectModalBody
                        routes={p.routesFromDestination}
                        onSelectRoute={p.onSelectRouteFromDestination}
                        selectedRouteId={p.selectedRouteIdFromDestination}
                    />
                    <div className="modal-footer">
                        <button
                            className="btn btn-default pull-right"
                            onClick={() => onClickConfirm()}
                            disabled={p.selectedRouteIdFromSource === '' || p.selectedRouteIdFromDestination === ''}
                        >
                            confirm <span className="ion-ios-checkmark-empty"/>
                        </button>
                    </div>
                </div>
            </LargeModalDialog>
        </ModalOverlayContainer>
    );
}