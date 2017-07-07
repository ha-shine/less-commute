import * as React from 'react';
import LargeModalDialog from './LargeModalDialog';
import LoadingAnimationModalContent from './LoadingAnimationModalContent';
import './RouteSelectModal.css';
import ModalOverlayContainer from './ModalOverlayContainer';
import RouteSelectModalBody from './RouteSelectModalBody';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import * as constants from '../constants/index';

interface Props {
    currentModal: constants.CurrentModal;
    isFetching: boolean;
    source: AutocompletePrediction;
    destination: AutocompletePrediction;
    routesFromSource: IdentifiableDirectionsRoute[];
    routesFromDestination: IdentifiableDirectionsRoute[];
    selectedRouteIdFromSource: string;
    selectedRouteIdFromDestination: string;
    onSelectRouteFromSource: (s: string) => void;
    onSelectRouteFromDestination: (s: string) => void;
    onCloseModal: () => void;
    onConfirmBaseRoutes: (routes: DirectionsRoutePair) => void;
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
        const routePair = new DirectionsRoutePair(p.source, routeFromSource as IdentifiableDirectionsRoute,
                                                  routeFromDst as IdentifiableDirectionsRoute);
        p.onConfirmBaseRoutes(routePair);
        p.onCloseModal();
    };
    return (
        <ModalOverlayContainer>
            <LargeModalDialog>
                <div className="modal-content route-select-modal-content">
                    <span className="ion-android-close close-button" onClick={p.onCloseModal}/>
                    <div className="modal-header">
                        {p.source.description}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.destination.description}
                    </div>
                    <RouteSelectModalBody
                        routes={p.routesFromSource}
                        onSelectRoute={p.onSelectRouteFromSource}
                        selectedRouteId={p.selectedRouteIdFromSource}
                    />
                    <div className="modal-header">
                        {p.destination.description}
                        <span className="ion-ios-arrow-thin-right"/>
                        {p.source.description}
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