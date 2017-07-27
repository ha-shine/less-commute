import * as React from 'react';
import SimpleDialogModal from './SimpleDialogModal';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import GooglePlaceAutocomplete from './GooglePlaceAutocomplete';

interface Props {
    setWorkAddress: (address: AutocompletePrediction) => void;
    closeModal: () => void;
}
interface State {
    selectedAddress: AutocompletePrediction | null;
}
export default class EntryDialogModal extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            selectedAddress: null
        };
    }
    setAddress(address: AutocompletePrediction) {
        this.setState({
            selectedAddress: address
        });
    }
    removeAddress() {
        this.setState({
            selectedAddress: null
        });
    }
    shouldDisableConfirm() {
        return this.state.selectedAddress === null;
    }
    onClickConfirm = () => {
        if (this.state.selectedAddress !== null) {
            this.props.setWorkAddress(this.state.selectedAddress);
            this.props.closeModal();
        }
    }
    render() {
        const header = (
            <div className="modal-header text-center">
                <h5>Necessary Information</h5>
            </div>
        );

        const body = (
            <div className="modal-body">
                <p>I will need to know your destination/work address before we begin.</p>
                <div>
                    <div className="form-group" style={{marginTop: '15px'}}>
                        <label style={{color: '#333'}}>Work Address</label>
                        <GooglePlaceAutocomplete
                            onSelectAddress={(x: AutocompletePrediction) => this.setAddress(x)}
                            onRemoveAddress={() => this.removeAddress()}
                        />
                    </div>
                </div>
            </div>
        );

        const footer = (
            <div className="modal-footer">
                <button
                    className="btn btn-primary"
                    disabled={this.shouldDisableConfirm()}
                    onClick={() => this.onClickConfirm()}
                >
                    Confirm
                </button>
            </div>
        );
        return (
            <SimpleDialogModal
                header={header}
                body={body}
                footer={footer}
                closeable={false}
            />
        );
    }
}