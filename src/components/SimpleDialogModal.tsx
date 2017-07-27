import * as React from 'react';
import SmallModalDialog from './SmallModalDialog';
import ModalOverlayContainer from './ModalOverlayContainer';
import './SimpleDialogModal.css';

interface Props {
    header: JSX.Element;
    body: JSX.Element;
    footer: JSX.Element;
    closeable: boolean;
    onClose?: () => void;
}
export default function SimpleDialogModal({header, body, footer, closeable, onClose}: Props) {
    return (
        <ModalOverlayContainer>
            <SmallModalDialog>
                <div className="modal-content dialog-modal">
                    {closeable &&
                    <span className="ion-android-close close-button pull-right" onClick={onClose}/>
                    }
                    {header}
                    {body}
                    {footer}
                </div>
            </SmallModalDialog>
        </ModalOverlayContainer>
    );
}