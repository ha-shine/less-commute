/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import './MainForm.css';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import * as constants from '../constants/index';

export interface Props {
    selectedWorkAddress: AutocompletePrediction | null;
    selectedHomeAddress: AutocompletePrediction | null;
    onSelectHomeAddress: (address: AutocompletePrediction) => void;
    onSelectWorkAddress: (address: AutocompletePrediction) => void;
    onRemoveHomeAddress: () => void;
    onRemoveWorkAddress: () => void;
    onReceiveRouteFromSource: (route: IdentifiableDirectionsRoute[]) => void;
    onReceiveRouteFromDestination: (route: IdentifiableDirectionsRoute[]) => void;
    onShowModal: (s: constants.CurrentModal) => void;
    onClickCalculateBtn: () => void;
    setDays: (days: number) => void;
}
export default class MainForm extends React.Component<Props, {}> {
    private daysInput: HTMLInputElement;
    onClickCalculate= () => {
        this.props.setDays(Number(this.daysInput.value));
        this.props.onClickCalculateBtn();
    }
    render() {
        const shouldDisableCalculateButton = this.props.selectedHomeAddress == null ||
            this.props.selectedWorkAddress == null;
        return (
            <div className="form main-form">
                <div className="form-group">
                    <label>Home Address</label>
                    <GooglePlaceAutocomplete
                        onSelectAddress={this.props.onSelectHomeAddress}
                        onRemoveAddress={this.props.onRemoveHomeAddress}
                    />
                </div>
                <div className="form-group">
                    <label>Work Address</label>
                    <GooglePlaceAutocomplete
                        onSelectAddress={this.props.onSelectWorkAddress}
                        onRemoveAddress={this.props.onRemoveWorkAddress}
                    />
                </div>
                <div className="form-group">
                    <label>You work</label>
                    <div className="row">
                        <div className="col-xs-6">
                            <input
                                type="text"
                                className="form-control"
                                defaultValue="20"
                                ref={(daysInput) => this.daysInput = daysInput as HTMLInputElement}
                            />
                        </div>
                        <div className="col-xs-6 days-label">
                            days a month
                        </div>
                    </div>
                </div>
                <button
                    className="btn btn-default btn-block"
                    disabled={shouldDisableCalculateButton}
                    onClick={this.onClickCalculate}
                >
                    Calculate <span className="ion-navigate"/>
                </button>
            </div>
        );
    }
}