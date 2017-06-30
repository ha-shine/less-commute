import * as React from 'react';
import * as constants from '../constants/index';
import './ModalOverlay.css';
import RouteSelectModalDialog from '../containers/RouteSelectModalDialog';
import ModalOverlayContainer from './ModalOverlayContainer';

export interface Props {
    showModal: boolean;
    currentModal: string;
}
export default function ModalOverlay(props: Props) {
    if (props.showModal) {
        switch (props.currentModal) {
            case constants.MODAL_SELECT_BASE_ROUTE:
                return <RouteSelectModalDialog />;
            default:
                return <ModalOverlayContainer />;
        }
    }
    return null;
}