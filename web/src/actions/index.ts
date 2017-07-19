import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import * as constants from '../constants';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import {CurrentModal} from '../constants/index';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
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

export type SelectedAddressAction = SelectWorkAddressAction | RemoveWorkAddressAction;

export interface FetchGoogleRouteAction {
    type: string;
    result: IdentifiableDirectionsRoute[];
}
export function fetchRouteFromSource(result: IdentifiableDirectionsRoute[]): FetchGoogleRouteAction {
    return {
        type: constants.FETCH_ROUTE_FROM_SOURCE,
        result: result
    };
}
export function clearRouteFromSource(): FetchGoogleRouteAction {
    return {
        type: constants.CLEAR_ROUTE_FROM_SOURCE,
        result: []
    };
}
export function fetchRouteFromDestination(result: IdentifiableDirectionsRoute[]): FetchGoogleRouteAction {
    return {
        type: constants.FETCH_ROUTE_FROM_DESTINATION,
        result: result
    };
}
export function clearRouteFromDestination(): FetchGoogleRouteAction {
    return {
        type: constants.CLEAR_ROUTE_FROM_DESTINATION,
        result: []
    };
}

export interface ShowModalAction {
    type: string;
    modal: constants.CurrentModal;
}
export function showModal(modal: constants.CurrentModal): ShowModalAction {
    return {
        type: constants.SHOW_MODAL,
        modal: modal
    };
}
export function hideModal(): ShowModalAction {
    return {
        type: constants.HIDE_MODAL,
        modal: CurrentModal.None
    };
}

export interface SelectRouteAction {
    type: string;
    routeId: string;
}
export function selectRouteFromSource(routeId: string): SelectRouteAction {
    return {
        type: constants.SELECT_ROUTE_FROM_SOURCE,
        routeId
    };
}
export function selectRouteFromDestination(routeId: string): SelectRouteAction {
    return {
        type: constants.SELECT_ROUTE_FROM_DESTINATION,
        routeId
    };
}
export function clearSelectedRoutes(): SelectRouteAction {
    return {
        type: constants.CLEAR_SELECTED_ROUTE_IDS,
        routeId: ''
    };
}

export interface SetDaysAction {
    type: string;
    days: number;
}
export function setDays(days: number): SetDaysAction {
    return {
        type: constants.SET_DAYS,
        days
    };
}

export interface ChooseAdditionalAddressAction {
    type: string;
    address: AutocompletePrediction | null;
}
export function chooseAdditionalAddress(address: AutocompletePrediction): ChooseAdditionalAddressAction {
    return {
        type: constants.CHOOSE_ADDITIONAL_ADDRESS,
        address
    };
}
export function clearAdditionalAddress(): ChooseAdditionalAddressAction {
    return {
        type: constants.CHOOSE_ADDITIONAL_ADDRESS,
        address: null
    };
}

export interface AddAdditionalRoutesAction {
    type: string;
    pair: DirectionsRoutePair;
}
export function addAdditionalRoutes(pair: DirectionsRoutePair): AddAdditionalRoutesAction {
    return {
        type: constants.ADD_ADDITIONAL_ROUTES,
        pair
    };
}

export interface ChangeAdditionalRoutesAction {
    type: string;
    existingPairId: string;
    pair: DirectionsRoutePair;
}
export function changeAdditionalRoutes(existingPairId: string,
                                       pair: DirectionsRoutePair): ChangeAdditionalRoutesAction {
    return {
        type: constants.CHANGE_ADDITIONAL_ROUTES,
        existingPairId,
        pair
    };
}

export interface RemoveAdditionalRoutesAction {
    type: string;
    pairId: string;
}
export function removeAdditionalRoutes(pairId: string): RemoveAdditionalRoutesAction {
    return {
        type: constants.REMOVE_ADDITIONAL_ROUTES,
        pairId
    };
}

export interface ClearAdditionalRoutesAction {
    type: string;
}
export function clearAdditionalRoutes(): ClearAdditionalRoutesAction {
    return {
        type: constants.CLEAR_ADDITIONAL_ROUTES
    };
}

export interface ExpandRouteAction {
    type: string;
    routeId: string;
}
export function expandRoute(routeId: string): ExpandRouteAction {
    return {
        type: constants.EXPAND_ROUTE,
        routeId
    };
}
export function collapseRoute(): ExpandRouteAction {
    return {
        type: constants.EXPAND_ROUTE,
        routeId: ''
    };
}

export interface TemporaryHomeAddressAction {
    type: string;
    address: AutocompletePrediction | null;
}