import * as React from 'react';
import * as constants from '../constants/index';
import './ModalOverlay.css';
import RouteSelectModalDialog from '../containers/RouteSelectModalDialog';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../containers/NewRouteModalDialog';
import RouteDeleteConfirmModal from '../containers/RouteDeleteConfirmModal';
import ResetConfirmModal from '../containers/ResetConfirmModal';

interface Props {
    currentModal: constants.CurrentModal;
}
export default function ModalOverlay(props: Props) {
    switch (props.currentModal) {
        case CurrentModal.BaseRoute:
        case CurrentModal.NewRouteSecondModal:
        case CurrentModal.ChangeRouteModal:
        case CurrentModal.ChangeBaseRouteModal:
            return <RouteSelectModalDialog />;
        case CurrentModal.NewRouteModal:
            return <NewRouteModalDialog />;
        case CurrentModal.RouteDeleteConfirmModal:
            return <RouteDeleteConfirmModal />;
        case CurrentModal.ResetConfirmModal:
            return <ResetConfirmModal />;
        case CurrentModal.ChangeHomeAddressModal:
            return <RouteSelectModalDialog />;
        default:
            return null;
    }
}