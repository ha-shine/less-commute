/**
 * Created by shine on 29/6/2017.
 */
import * as React from 'react';
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';
import './MainForm.css';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import * as constants from '../constants/index';
import {CurrentModal, CurrentPage} from '../constants/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import {
    SelectHomeAddressAction,
    SelectWorkAddressAction, SetDaysAction, ShowModalAction
} from '../actions/index';
import {SyntheticEvent} from 'react';

interface Props {
    selectedWorkAddress: AutocompletePrediction | null;
    selectedHomeAddress: AutocompletePrediction | null;
    temporaryHomeAddress: AutocompletePrediction | null;
    baseRoutes: DirectionsRoutePair | null;
    onSelectHomeAddress: (address: AutocompletePrediction) => SelectHomeAddressAction;
    onSelectWorkAddress: (address: AutocompletePrediction) => SelectWorkAddressAction;
    onShowModal: (s: constants.CurrentModal) => ShowModalAction;
    setDays: (days: number) => SetDaysAction;
    onClickReset: () => ShowModalAction;
    setTemporaryHomeAddress: (address: AutocompletePrediction) => void;
    removeTemporaryHomeAddress: () => void;
    days: number;
    changePage: (page: constants.CurrentPage) => void;
}
interface State {
    homeAddressState: AutocompletePrediction | null;
    workAddressState: AutocompletePrediction | null;
    days: number;
}
export default class MainForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            homeAddressState: null,
            workAddressState: null,
            days: 20
        };
    }
    componentDidMount() {
        this.props.removeTemporaryHomeAddress();
        this.setState({
            days: this.props.days
        });
    }
    setHomeAddress = (address: AutocompletePrediction) => {
        this.setState({
            homeAddressState: address
        });
    }
    removeHomeAddress = () => {
        this.setState({
            homeAddressState: null
        });
    }
    setWorkAddress = (address: AutocompletePrediction) => {
        this.setState({
            workAddressState: address
        });
    }
    removeWorkAddress = () => {
        this.setState({
            workAddressState: null
        });
    }
    onClickSaveChanges = () => {
        this.props.setDays(this.state.days);
        if (this.state.homeAddressState !== null) {
            const tempPid = this.props.temporaryHomeAddress === null ? '' : this.props.temporaryHomeAddress.place_id;
            if (tempPid !== this.state.homeAddressState.place_id) {
                this.props.setTemporaryHomeAddress(this.state.homeAddressState);
                this.props.onShowModal(CurrentModal.ChangeHomeAddressModal);
            } else {
                this.props.changePage(CurrentPage.RouteCompareMenu);
            }
        } else {
            this.props.changePage(CurrentPage.RouteCompareMenu);
        }
    }
    onClickCalculate= () => {
        if (!this.shouldDisableCalculateButton()) {
            this.props.setDays(this.state.days);
            this.props.onSelectHomeAddress(this.state.homeAddressState as AutocompletePrediction);
            this.props.onSelectWorkAddress(this.state.workAddressState as AutocompletePrediction);
            this.props.onShowModal(CurrentModal.BaseRoute);
        }
    }
    onDaysInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const days = Number(event.currentTarget.value);
        if (!isNaN(days)) {
            this.setState({
                days: days
            });
        }
    }
    shouldDisableCalculateButton() {
        return this.state.homeAddressState === null || this.state.workAddressState === null;
    }
    render() {

        let buttonRow = (
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="btn btn-default btn-block"
                        disabled={this.shouldDisableCalculateButton()}
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
                        <button className="btn btn-primary btn-block" onClick={this.onClickSaveChanges}>
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
                        onSelectAddress={(address: AutocompletePrediction) => this.setHomeAddress(address)}
                        onRemoveAddress={() => this.removeHomeAddress()}
                        existingAddress={this.props.selectedHomeAddress}
                    />
                </div>
                <div className="form-group">
                    <label>Work Address</label>
                    <GooglePlaceAutocomplete
                        onSelectAddress={(address: AutocompletePrediction) => this.setWorkAddress(address)}
                        onRemoveAddress={() => this.removeWorkAddress()}
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
                                value={this.state.days}
                                onChange={this.onDaysInputChange}
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