import * as React from 'react';
import * as constants from '../constants/index';
import './ModalOverlay.css';
import RouteSelectModalDialog from '../containers/RouteSelectModalDialog';
import {CurrentModal} from '../constants/index';
import NewRouteModalDialog from '../containers/NewRouteModalDialog';

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
        default:
            return null;
    }
}