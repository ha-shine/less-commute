import * as React from 'react';
import SmallModalDialog from './SmallModalDialog';
import ModalOverlayContainer from './ModalOverlayContainer';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import './NewRouteModalDialog.css';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {ChooseAdditionalAddressAction, ShowModalAction} from '../actions/index';

interface Props {
    workAddress: AutocompletePrediction;
    onHideModal: () => ShowModalAction;
    onShowNextStage: () => ShowModalAction;
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
            this.props.chooseAdditionalAddress(this.state.selectedAddress);
            this.props.onShowNextStage();
        }
    }
    render () {
        return (
            <ModalOverlayContainer>
                <SmallModalDialog>
                    <div className="modal-content new-route-modal">
                        <span className="ion-android-close close-button" onClick={this.onCloseModal}/>
                        <div className="modal-header"><h5>Add New Address</h5></div>
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
                                {this.state.selectedAddress !== null &&
                                <a
                                    className="pull-right"
                                    onClick={this.onClickNext}
                                >
                                    Next
                                    <span className="ion-ios-arrow-thin-right"/>
                                </a>
                                }
                            </div>
                        </div>
                    </div>
                </SmallModalDialog>
            </ModalOverlayContainer>
        );
    }
}