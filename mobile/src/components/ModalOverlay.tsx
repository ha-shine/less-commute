import * as React from 'react';
import * as constants from '../constants/index';
import './ModalOverlay.css';
import RouteSelectModalDialog from '../containers/RouteSelectModalDialog';
import ModalOverlayContainer from './ModalOverlayContainer';
import {CurrentModal} from '../constants/index';

export interface Props {
    showModal: boolean;
    currentModal: constants.CurrentModal;
}
export default function ModalOverlay(props: Props) {
    if (props.showModal) {
        switch (props.currentModal) {
            case CurrentModal.BaseRoute:
                return <RouteSelectModalDialog />;
            default:
                return <ModalOverlayContainer />;
        }
    }
    return null;
}