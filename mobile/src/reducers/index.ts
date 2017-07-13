import * as constants from '../constants/index';
import {
    AddAdditionalRoutesAction, ChangeAdditionalRoutesAction,
    ChangePageAction, ChooseAdditionalAddressAction,
    ConfirmRouteAction, ExpandRouteAction,
    FetchGoogleRouteAction, RemoveAdditionalRoutesAction,
    SelectedAddressAction, SelectRouteAction, SetDaysAction, ShowModalAction, TemporaryHomeAddressAction,
    TopbarDropdownMenuAction
} from '../actions/index';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import {combineReducers} from 'redux';
import {StoreState} from '../types/index';
import {CurrentModal, CurrentPage} from '../constants/index';
import IdentifiableDirectionsRoute from '../entities/IdentifiableDirectionsRoute';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import { ClearAdditionalRoutesAction } from '../actions/index';
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

export function routesFromSource(state: IdentifiableDirectionsRoute[] = [],
                                 action: FetchGoogleRouteAction): IdentifiableDirectionsRoute[] {
    switch (action.type) {
        case constants.FETCH_ROUTE_FROM_SOURCE:
        case constants.CLEAR_ROUTE_FROM_SOURCE:
            return action.result;
        default:
            return state;
    }
}
export function routesFromDestination(state: IdentifiableDirectionsRoute[] = [],
                                      action: FetchGoogleRouteAction): IdentifiableDirectionsRoute[] {
    switch (action.type) {
        case constants.FETCH_ROUTE_FROM_DESTINATION:
        case constants.CLEAR_ROUTE_FROM_DESTINATION:
            return action.result;
        default:
            return state;
    }
}

export function currentModal(state: constants.CurrentModal = CurrentModal.None,
                             action: ShowModalAction): constants.CurrentModal {
    switch (action.type) {
        case constants.SHOW_MODAL:
        case constants.HIDE_MODAL:
            return action.modal;
        default:
            return state;
    }
}

export function selectedRouteIdFromSource(state: string = '', action: SelectRouteAction): string {
    switch (action.type) {
        case constants.SELECT_ROUTE_FROM_SOURCE:
        case constants.CLEAR_SELECTED_ROUTE_IDS:
            return action.routeId;
        default:
            return state;
    }
}

export function selectedRouteIdFromDestination(state: string = '', action: SelectRouteAction): string {
    switch (action.type) {
        case constants.SELECT_ROUTE_FROM_DESTINATION:
        case constants.CLEAR_SELECTED_ROUTE_IDS:
            return action.routeId;
        default:
            return state;
    }
}

export function baseRoutes(state: DirectionsRoutePair | null = null,
                           action: ConfirmRouteAction): DirectionsRoutePair | null {
    switch (action.type) {
        case constants.CONFIRM_BASE_ROUTES:
            return action.routes;
        case constants.CLEAR_BASE_ROUTES:
            return action.routes;
        default:
            return state;
    }
}

export function currentPage(state: constants.CurrentPage = CurrentPage.MainMenu,
                            action: ChangePageAction): constants.CurrentPage {
    switch (action.type) {
        case constants.CHANGE_PAGE:
            return action.page;
        default:
            return state;
    }
}

export function days(state: number = 20, action: SetDaysAction): number {
    switch (action.type) {
        case constants.SET_DAYS:
            return action.days;
        default:
            return state;
    }
}

export function additionalAddress(state: AutocompletePrediction | null = null,
                                  action: ChooseAdditionalAddressAction): AutocompletePrediction | null {
    switch (action.type) {
        case constants.CHOOSE_ADDITIONAL_ADDRESS:
            return action.address;
        default:
            return state;
    }
}

export function additionalRoutes(state: DirectionsRoutePair[] = [],
                                 action: AddAdditionalRoutesAction |
                                     RemoveAdditionalRoutesAction |
                                     ChangeAdditionalRoutesAction |
                                     ClearAdditionalRoutesAction) {
    let additionalRoutes = state.slice();
    switch (action.type) {
        case constants.ADD_ADDITIONAL_ROUTES:
            const addAction = action as AddAdditionalRoutesAction;
            additionalRoutes.push(addAction.pair);
            return additionalRoutes;
        case constants.CHANGE_ADDITIONAL_ROUTES:
            const changeAction = action as ChangeAdditionalRoutesAction;
            const index = additionalRoutes.findIndex(x => x.id === changeAction.existingPairId);
            if (index !== -1) {
                additionalRoutes[index] = changeAction.pair;
            }
            return additionalRoutes;
        case constants.REMOVE_ADDITIONAL_ROUTES:
            const removeAction = action as RemoveAdditionalRoutesAction;
            return additionalRoutes.filter((x) => x.id !== removeAction.pairId);
        case constants.CLEAR_ADDITIONAL_ROUTES:
            return [];
        default:
            return state;
    }
}

export function expandedRouteId(state: string = '', action: ExpandRouteAction): string {
    switch (action.type) {
        case constants.EXPAND_ROUTE:
            return action.routeId;
        default:
            return state;
    }
}

export function showTopbarDropdownMenu(state: boolean = false, action: TopbarDropdownMenuAction): boolean {
    switch (action.type) {
        case constants.SHOW_TOPBAR_DROPDOWN_MENU:
            return true;
        case constants.HIDE_TOPBAR_DROPDOWN_MENU:
            return false;
        default:
            return state;
    }
}

export function temporaryHomeAddress(state: AutocompletePrediction | null = null,
                                     action: TemporaryHomeAddressAction): AutocompletePrediction | null {
    switch (action.type) {
        case constants.SET_TEMPORARY_HOME_ADDRESS:
            return action.address;
        default:
            return state;
    }
}

export const rootReducer = combineReducers<StoreState>({
    selectedHomeAddress,
    selectedWorkAddress,
    routesFromSource,
    routesFromDestination,
    currentModal,
    selectedRouteIdFromSource,
    selectedRouteIdFromDestination,
    baseRoutes,
    currentPage,
    days,
    additionalAddress,
    additionalRoutes,
    expandedRouteId,
    showTopbarDropdownMenu,
    temporaryHomeAddress
});