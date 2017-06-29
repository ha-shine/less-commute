import {StoreState} from '../types/index';
import * as constants from '../constants/index';
import {SelectedAddressAction} from '../actions/index';
/**
 * Created by Shine on 6/29/2017.
 */
export function selectedAddresses(state: StoreState, action: SelectedAddressAction): StoreState {
    switch (action.type) {
        case constants.SELECT_HOME_ADDRESS:
        case constants.REMOVE_HOME_ADDRESS:
            return {...state, selectedHomeAddress: action.address};
        case constants.SELECT_WORK_ADDRESS:
        case constants.REMOVE_WORK_ADDRESS:
            return {...state, selectedWorkAddress: action.address};
        default:
            return state;
    }
}