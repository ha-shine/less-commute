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
import {CurrentModal} from '../constants/index';
import DirectionsResult = google.maps.DirectionsResult;
import {getGoogleDirection} from '../services/index';

interface Props {
    existingPairId: string;
    currentModal: constants.CurrentModal;
    source: AutocompletePrediction;
    destination: AutocompletePrediction;
    onReceiveRouteFromSource: (route: IdentifiableDirectionsRoute[]) => void;
    onReceiveRouteFromDestination: (route: IdentifiableDirectionsRoute[]) => void;
    routesFromSource: IdentifiableDirectionsRoute[];
    routesFromDestination: IdentifiableDirectionsRoute[];
    selectedRouteIdFromSource: string;
    selectedRouteIdFromDestination: string;
    onSelectRouteFromSource: (s: string) => void;
    onSelectRouteFromDestination: (s: string) => void;
    onCloseModal: () => void;
    onConfirmBaseRoutes: (routes: DirectionsRoutePair) => void;
    onConfirmAdditionalRoutes: (routes: DirectionsRoutePair) => void;
    onConfirmChangeRoutes: (existingPairId: string, routes: DirectionsRoutePair) => void;
}
export default class RouteSelectModalDialog extends React.Component<Props, {}> {
    componentDidMount() {
        let departureTimeFromSource = new Date();
        let departureTimeFromDestination = new Date();
        departureTimeFromSource.setHours(8);
        departureTimeFromDestination.setHours(18);
        const callbackFromSource = (result: DirectionsResult) => {
            const directionsRoutes = result.routes.map((route) => {
                return new IdentifiableDirectionsRoute(route);
            });
            this.props.onReceiveRouteFromSource(directionsRoutes);
        };
        const callbackFromDestination = (result: DirectionsResult) => {
            const directionsRoutes = result.routes.map((route) => {
                return new IdentifiableDirectionsRoute(route);
            });
            this.props.onReceiveRouteFromDestination(directionsRoutes);
        };
        const source = this.props.source as AutocompletePrediction;
        const destination = this.props.destination as AutocompletePrediction;
        getGoogleDirection(source, destination, departureTimeFromSource, callbackFromSource);
        getGoogleDirection(destination, source, departureTimeFromDestination, callbackFromDestination);
    }
    render() {
        const p = this.props;
        if (p.routesFromSource.length <= 0 || p.routesFromDestination.length <= 0) {
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
            switch (p.currentModal) {
                case CurrentModal.ChangeBaseRouteModal:
                case CurrentModal.BaseRoute:
                    p.onConfirmBaseRoutes(routePair);
                    break;
                case CurrentModal.NewRouteSecondModal:
                    p.onConfirmAdditionalRoutes(routePair);
                    break;
                default:
                    p.onConfirmChangeRoutes(p.existingPairId, routePair);
                    break;
            }

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
}