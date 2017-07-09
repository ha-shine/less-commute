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

export interface ConfirmRouteAction {
    type: string;
    routes: DirectionsRoutePair | null;
}
export function confirmBaseRoute(routes: DirectionsRoutePair): ConfirmRouteAction {
    return {
        type: constants.CONFIRM_BASE_ROUTES,
        routes
    };
}
export function clearBaseRoute(): ConfirmRouteAction {
    return {
        type: constants.CLEAR_BASE_ROUTES,
        routes: null
    };
}

export interface ChangePageAction {
    type: string;
    page: constants.CurrentPage;
}
export function changePage(page: constants.CurrentPage): ChangePageAction {
    return {
        type: constants.CHANGE_PAGE,
        page
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

export interface ShowTopbarDropdownMenuAction {
    type: string;
}
export function showTopbarDropdownMenu(): ShowTopbarDropdownMenuAction {
    return {
        type: constants.SHOW_TOPBAR_DROPDOWN_MENU
    };
}
export interface HideTopbarDropdownMenuAction {
    type: string;
}
export function hideTopbarDropdownMenu(): HideTopbarDropdownMenuAction {
    return {
        type: constants.HIDE_TOPBAR_DROPDOWN_MENU
    };
}

export type TopbarDropdownMenuAction = ShowTopbarDropdownMenuAction | HideTopbarDropdownMenuAction;