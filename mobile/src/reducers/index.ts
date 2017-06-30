import * as constants from '../constants/index';
import {SelectedAddressAction} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {combineReducers} from 'redux';
import {StoreState} from '../types/index';
/**
 * Created by Shine on 6/29/2017.
 */
export function selectedHomeAddress(state: AutocompletePrediction | null = null, action: SelectedAddressAction):
    AutocompletePrediction | null {
    switch (action.type) {
        case constants.SELECT_HOME_ADDRESS:
        case constants.REMOVE_HOME_ADDRESS:
            return action.address;
        default:
            return state;
    }
}

export function selectedWorkAddress(state: AutocompletePrediction | null = null, action: SelectedAddressAction):
    AutocompletePrediction | null {
    switch (action.type) {
        case constants.SELECT_WORK_ADDRESS:
        case constants.REMOVE_WORK_ADDRESS:
            return action.address;
        default:
            return state;
    }
}

export const rootReducer = combineReducers<StoreState>({
    selectedHomeAddress,
    selectedWorkAddress
});