import * as React from 'react';
import * as constants from '../constants/index';
import './ModalOverlay.css';
import RouteSelectModalDialog from '../containers/RouteSelectModalDialog';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../containers/NewRouteModalDialog';
import RouteDeleteConfirmModal from '../containers/RouteDeleteConfirmModal';

interface Props {
    currentModal: constants.CurrentModal;
}
export default function ModalOverlay(props: Props) {
    switch (props.currentModal) {
        case CurrentModal.BaseRoute:
        case CurrentModal.NewRouteSecondModal:
            return <RouteSelectModalDialog />;
        case CurrentModal.NewRouteModal:
            return <NewRouteModalDialog />;
        case CurrentModal.RouteDeleteConfirmModal:
            return <RouteDeleteConfirmModal />;
        default:
            return null;
    }
}