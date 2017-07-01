import * as constants from '../constants/index';
import {
    FetchGoogleRouteAction,
    SelectedAddressAction, ShowModalAction,
    ToggleModalAction
} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {combineReducers} from 'redux';
import {StoreState} from '../types/index';
import DirectionsRoute = google.maps.DirectionsRoute;
import {CurrentModal} from '../constants/index';
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

export function showModal(state: boolean = false, action: ToggleModalAction): boolean {
    switch (action.type) {
        case constants.TOGGLE_MODAL:
            return !state;
        default:
            return state;
    }
}

export function routesFromSource(state: DirectionsRoute[] = [],
                                 action: FetchGoogleRouteAction): DirectionsRoute[] {
    switch (action.type) {
        case constants.FETCH_ROUTE_FROM_SOURCE:
            return action.result;
        default:
            return state;
    }
}
export function routesFromDestination(state: DirectionsRoute[] = [],
                                      action: FetchGoogleRouteAction): DirectionsRoute[] {
    switch (action.type) {
        case constants.FETCH_ROUTE_FROM_DESTINATION:
            return action.result;
        default:
            return state;
    }
}

export function currentModal(state: constants.CurrentModal = CurrentModal.None,
                             action: ShowModalAction): constants.CurrentModal {
    switch (action.type) {
        case constants.SHOW_MODAL:
            return action.modal;
        default:
            return state;
    }
}

export const rootReducer = combineReducers<StoreState>({
    selectedHomeAddress,
    selectedWorkAddress,
    showModal,
    routesFromSource,
    routesFromDestination,
    currentModal
});