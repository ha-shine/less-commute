/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import './MainForm.css';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import * as constants from '../constants/index';
import {CurrentModal} from '../constants/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import {
    RemoveHomeAddressAction, SelectHomeAddressAction,
    SelectWorkAddressAction, SetDaysAction, ShowModalAction
} from '../actions/index';

interface Props {
    selectedWorkAddress: AutocompletePrediction | null;
    selectedHomeAddress: AutocompletePrediction | null;
    baseRoutes: DirectionsRoutePair | null;
    onSelectHomeAddress: (address: AutocompletePrediction) => SelectHomeAddressAction;
    onSelectWorkAddress: (address: AutocompletePrediction) => SelectWorkAddressAction;
    onRemoveHomeAddress: () => RemoveHomeAddressAction;
    onRemoveWorkAddress: () => RemoveHomeAddressAction;
    onShowModal: (s: constants.CurrentModal) => ShowModalAction;
    setDays: (days: number) => SetDaysAction;
    onClickReset: () => ShowModalAction;
}
export default class MainForm extends React.Component<Props, {}> {
    private daysInput: HTMLInputElement;
    onClickCalculate= () => {
        this.props.setDays(Number(this.daysInput.value));
        this.props.onShowModal(CurrentModal.BaseRoute);
    }
    render() {
        const shouldDisableCalculateButton = this.props.selectedHomeAddress == null ||
            this.props.selectedWorkAddress == null;

        let buttonRow = (
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="btn btn-default btn-block"
                        disabled={shouldDisableCalculateButton}
                        onClick={this.onClickCalculate}
                    >
                        Calculate <span className="ion-navigate"/>
                    </button>
                </div>
            </div>
        );
        if (this.props.baseRoutes !== null) {
            buttonRow = (
                <div className="row">
                    <div className="col-xs-6">
                        <button className="btn btn-primary btn-block">
                            Save Changes <span className="ion-checkmark"/>
                        </button>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-danger btn-block" onClick={this.props.onClickReset}>
                            Reset <span className="ion-refresh"/>
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="form main-form">
                <div className="form-group">
                    <label>Home Address</label>
                    <GooglePlaceAutocomplete
                        onSelectAddress={this.props.onSelectHomeAddress}
                        onRemoveAddress={this.props.onRemoveHomeAddress}
                        existingAddress={this.props.selectedHomeAddress}
                    />
                </div>
                <div className="form-group">
                    <label>Work Address</label>
                    <GooglePlaceAutocomplete
                        onSelectAddress={this.props.onSelectWorkAddress}
                        onRemoveAddress={this.props.onRemoveWorkAddress}
                        existingAddress={this.props.selectedWorkAddress}
                        disabled={this.props.baseRoutes !== null}
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
                {buttonRow}
            </div>
        );
    }
}