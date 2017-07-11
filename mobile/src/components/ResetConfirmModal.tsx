import * as React from 'react';
import YesNoDialogModal from './YesNoDialogModal';
import {ShowModalAction} from '../actions/index';

interface Props {
    onCloseModal: () => ShowModalAction;
    onConfirm: () => void;
}
export default class ResetConfirmModal extends React.Component<Props, {}> {
    onClickYes() {
        this.props.onConfirm();
        this.props.onCloseModal();
    }
    render() {
        return (
            <YesNoDialogModal
                header={'Hold up!'}
                onClickYes={() => this.onClickYes()}
                onClickNo={this.props.onCloseModal}
            >
                <p>
                    Are you sure about resetting everything? You will lose all your progress!
                </p>
            </YesNoDialogModal>
        );
    }
}