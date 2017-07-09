import * as React from 'react';
import YesNoDialogModal from './YesNoDialogModal';
import DirectionsRoutePair from '../entities/DirectionsRoutePair';
import {RemoveAdditionalRoutesAction, ShowModalAction} from '../actions/index';

interface Props {
    selectedDirectionsPair: DirectionsRoutePair;
    onCloseModal: () => ShowModalAction;
    onDeleteRoute: (pairId: string) => RemoveAdditionalRoutesAction;
}
export default class RouteDeleteConfirmModal extends React.Component<Props, {}> {
    onClickYes() {
        this.props.onDeleteRoute(this.props.selectedDirectionsPair.id);
        this.props.onCloseModal();
    }
    render() {
        return (
            <YesNoDialogModal
                header={'Whoa, there!'}
                onClickYes={() => this.onClickYes()}
                onClickNo={this.props.onCloseModal}
            >
                <p>
                    Are you sure you want to delete<b> {this.props.selectedDirectionsPair.address.description} </b>
                    fromn the list of addresses?
                </p>
            </YesNoDialogModal>
        );
    }
}