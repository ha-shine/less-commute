import * as React from 'react';
import { debounce } from 'lodash';
import {fetchGooglePredictions} from '../services/index';
import {SyntheticEvent} from 'react';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import './GooglePlaceAutocomplete.css';

const enhanceWithClickOutside = require('react-click-outside');

interface State {
    textboxValue: string;
    predictions: AutocompletePrediction[];
    selectedPrediction: AutocompletePrediction | null;
}

interface Props {
    disabled: boolean;
    existingAddress: AutocompletePrediction | null;
    onSelectAddress: (address: AutocompletePrediction) => void;
    onRemoveAddress: () => void;
}

class GooglePlaceAutocomplete extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            textboxValue: '',
            predictions: [],
            selectedPrediction: null
        };
        this.fetchGooglePrediction = debounce(this.fetchGooglePrediction, 200);
    }

    removeSelectedPrediction() {
        this.setState({
            selectedPrediction: null
        });
        this.props.onRemoveAddress();
    }

    removePredictions() {
        this.setState({
            predictions: []
        });
    }

    fetchGooglePrediction(text: string) {
        fetchGooglePredictions(text, (result: AutocompletePrediction[]) => {
            this.setState({
                predictions: result
            });
        });
    }

    onSelectPrediction(prediction: AutocompletePrediction) {
        this.setState({
            selectedPrediction: prediction,
            textboxValue: prediction.description,
            predictions: []
        });
        this.props.onSelectAddress(prediction);
    }

    onTextInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (this.state.selectedPrediction !== null) {
            this.removeSelectedPrediction();
        }

        this.setState({
            textboxValue: value
        });

        if (value !== '') {
            this.fetchGooglePrediction(value);
        } else {
            this.removePredictions();
        }
    }

    onTextInputFocus = (event: SyntheticEvent<HTMLInputElement>) => {
        if (this.state.textboxValue !== '' && this.state.selectedPrediction === null) {
            this.fetchGooglePrediction(this.state.textboxValue);
        }
    }

    handleClickOutside() {
        this.removePredictions();
    }

    componentDidMount() {
        const value = this.props.existingAddress === null ? '' : this.props.existingAddress.description;
        this.setState({
            textboxValue: value
        });
    }

    render() {
        const {textboxValue, predictions} = this.state;

        return (
            <span className="autocomplete-span-box">
                <input
                    type="text"
                    className="form-control"
                    value={textboxValue}
                    onChange={this.onTextInputChange}
                    onFocus={this.onTextInputFocus}
                    style={{position: 'relative'}}
                    disabled={this.props.disabled}
                />
                <SelectableList
                    predictions={predictions}
                    onSelectPrediction={(prediction) => this.onSelectPrediction(prediction)}
                />
            </span>
        );
    }
}

export default enhanceWithClickOutside(GooglePlaceAutocomplete);

interface ListProps {
    predictions: AutocompletePrediction[];
    onSelectPrediction(prediction: AutocompletePrediction): void;
}

function SelectableList(props: ListProps) {
    let listItems = props.predictions.map((item) => {
       return (
           <li key={item.place_id} className="item" onClick={() => props.onSelectPrediction(item)}>
               {item.description}
           </li>
       );
    });

    return (
        <ul className="selectable-dropdown-list">
            {listItems}
        </ul>
    );
}