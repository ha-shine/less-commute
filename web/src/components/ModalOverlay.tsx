import * as React from 'react';
import * as constants from '../constants/index';
import './ModalOverlay.css';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../containers/NewRouteModalDialog';
import RouteDeleteConfirmModal from '../containers/RouteDeleteConfirmModal';
import EntryDialogModal from '../containers/EntryDialogModal';
import RouteSelectModalDialog from '../containers/RouteSelectModalDialog';

interface Props {
    currentModal: constants.CurrentModal;
}
export default function ModalOverlay(props: Props) {
    switch (props.currentModal) {
        case CurrentModal.NewRouteSecondModal:
        case CurrentModal.ChangeRouteModal:
            return <RouteSelectModalDialog />;
        case CurrentModal.NewRouteModal:
            return <NewRouteModalDialog />;
        case CurrentModal.RouteDeleteConfirmModal:
            return <RouteDeleteConfirmModal />;
        case CurrentModal.EntryDialogModal:
            return <EntryDialogModal />;
        default:
            return null;
    }
}