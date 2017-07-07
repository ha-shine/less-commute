import * as React from 'react';
import SmallModalDialog from './SmallModalDialog';
import ModalOverlayContainer from './ModalOverlayContainer';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import './NewRouteModalDialog.css';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {ChooseAdditionalAddressAction, FetchGoogleRouteAction, ShowModalAction} from '../actions/index';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import DirectionsResult = google.maps.DirectionsResult;
import {getGoogleDirection} from '../services/index';

interface Props {
    workAddress: AutocompletePrediction;
    onHideModal: () => ShowModalAction;
    onShowNextStage: () => ShowModalAction;
    fetchRoutesFromSource: (routes: IdentifiableDirectionsRoute[]) => FetchGoogleRouteAction;
    fetchRoutesFromDestination: (routes: IdentifiableDirectionsRoute[]) => FetchGoogleRouteAction;
    chooseAdditionalAddress: (a: AutocompletePrediction) => ChooseAdditionalAddressAction;
    clearAdditionalAddress: () => ChooseAdditionalAddressAction;
}
interface State {
    selectedAddress: AutocompletePrediction | null;
}
export default class NewRouteModalDialog extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            selectedAddress: null
        };
    }
    onCloseModal = () => {
        this.props.clearAdditionalAddress();
        this.props.onHideModal();
    }
    onSelectAddress = (prediction: AutocompletePrediction) => {
        this.setState({
            selectedAddress: prediction
        });
    }
    onRemoveAddress = () => {
        this.setState({
            selectedAddress: null
        });
    }
    onClickNext= () => {
        if (this.state.selectedAddress !== null) {
            this.fetchRoutes();
            this.props.chooseAdditionalAddress(this.state.selectedAddress);
            this.props.onShowNextStage();
        }
    }
    fetchRoutes = () => {
        const source = this.state.selectedAddress as AutocompletePrediction;
        const dstn = this.props.workAddress;
        let departureTimeFromSource = new Date();
        let departureTimeFromDestination = new Date();
        departureTimeFromSource.setHours(8);
        departureTimeFromDestination.setHours(18);
        const callbackFromSource = (result: DirectionsResult) => {
            const directionsRoutes = result.routes.map((route) => {
                return new IdentifiableDirectionsRoute(route);
            });
            this.props.fetchRoutesFromSource(directionsRoutes);
        };
        const callbackFromDestination = (result: DirectionsResult) => {
            const directionsRoutes = result.routes.map((route) => {
                return new IdentifiableDirectionsRoute(route);
            });
            this.props.fetchRoutesFromDestination(directionsRoutes);
        };
        getGoogleDirection(source, dstn, departureTimeFromSource, callbackFromSource);
        getGoogleDirection(dstn, source, departureTimeFromDestination, callbackFromDestination);
    }
    render () {
        return (
            <ModalOverlayContainer>
                <SmallModalDialog>
                    <div className="modal-content new-route-modal">
                        <span className="ion-android-close close-button" onClick={this.onCloseModal}/>
                        <div className="modal-header">Add New Route</div>
                        <div className="modal-body">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <GooglePlaceAutocomplete
                                        onSelectAddress={(x: AutocompletePrediction) => this.onSelectAddress(x)}
                                        onRemoveAddress={() => this.onRemoveAddress()}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <a className="pull-left" onClick={this.onCloseModal}>Cancel</a>
                                <a
                                    className="pull-right"
                                    disabled={this.state.selectedAddress === null}
                                    onClick={this.onClickNext}
                                >
                                    Next
                                    <span className="ion-ios-arrow-thin-right"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </SmallModalDialog>
            </ModalOverlayContainer>
        );
    }
}