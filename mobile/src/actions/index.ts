import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import * as constants from '../constants';
import DirectionsRoute = google.maps.DirectionsRoute;
/**
 * Created by Shine on 6/29/2017.
 */

export interface SelectWorkAddressAction {
    type: string;
    address: AutocompletePrediction;
}
export function selectWorkAddress(address: AutocompletePrediction): SelectWorkAddressAction {
    return {
        type: constants.SELECT_WORK_ADDRESS,
        address: address
    };
}

export interface RemoveWorkAddressAction {
    type: string;
    address: null;
}
export function removeWorkAddress(): RemoveWorkAddressAction {
    return {
        type: constants.REMOVE_WORK_ADDRESS,
        address: null
    };
}

export interface SelectHomeAddressAction extends SelectWorkAddressAction {
    type: string;
    address: AutocompletePrediction;
}
export function selectHomeAddress(address: AutocompletePrediction): SelectHomeAddressAction {
    return {
        type: constants.SELECT_HOME_ADDRESS,
        address: address
    };
}

export interface RemoveHomeAddressAction {
    type: string;
    address: null;
}
export function removeHomeAddress(): RemoveHomeAddressAction {
    return {
        type: constants.REMOVE_HOME_ADDRESS,
        address: null
    };
}

export type SelectedAddressAction = SelectHomeAddressAction | SelectWorkAddressAction |
                                    RemoveHomeAddressAction | RemoveWorkAddressAction;

export interface ToggleModalAction {
    type: string;
}
export function toggleModal(): ToggleModalAction {
    return {
        type: constants.TOGGLE_MODAL
    };
}

export interface FetchGoogleRouteAction {
    type: string;
    result: DirectionsRoute[];
}
export function fetchRouteFromSource(result: DirectionsRoute[]): FetchGoogleRouteAction {
    return {
        type: constants.FETCH_ROUTE_FROM_SOURCE,
        result: result
    };
}
export function fetchRouteFromDestination(result: DirectionsRoute[]): FetchGoogleRouteAction {
    return {
        type: constants.FETCH_ROUTE_FROM_DESTINATION,
        result: result
    };
}

export interface ShowModalAction {
    type: string;
    modal: string;
}
export function showModal(modal: string): ShowModalAction {
    return {
        type: constants.SHOW_MODAL,
        modal: constants.MODAL_SELECT_BASE_ROUTE
    };
}