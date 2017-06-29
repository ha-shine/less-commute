/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import './MainForm.css';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

export interface Props {
    selectedWorkAddress: AutocompletePrediction | null;
    selectedHomeAddress: AutocompletePrediction | null;
    onSelectHomeAddress: (address: AutocompletePrediction) => void;
    onSelectWorkAddress: (address: AutocompletePrediction) => void;
    onRemoveHomeAddress: () => void;
    onRemoveWorkAddress: () => void;
}
export default function MainForm(props: Props) {
    const shouldDisableCalculateButton = props.selectedHomeAddress == null || props.selectedWorkAddress == null;
    return (
        <div className="form main-form">
            <div className="form-group">
                <label>Home Address</label>
                <GooglePlaceAutocomplete
                    onSelectAddress={props.onSelectHomeAddress}
                    onRemoveAddress={props.onRemoveHomeAddress}
                />
            </div>
            <div className="form-group">
                <label>Work Address</label>
                <GooglePlaceAutocomplete
                    onSelectAddress={props.onSelectWorkAddress}
                    onRemoveAddress={props.onRemoveWorkAddress}
                />
            </div>
            <div className="form-group">
                <label>You work</label>
                <div className="row">
                    <div className="col-xs-6">
                        <input type="text" className="form-control" defaultValue="20"/>
                    </div>
                    <div className="col-xs-6 days-label">
                        days a month
                    </div>
                </div>
            </div>
            <button className="btn btn-default btn-block" disabled={shouldDisableCalculateButton}>
                Calculate <span className="ion-navigate"/>
            </button>
        </div>
    );
}