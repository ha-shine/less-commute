import * as React from 'react';
import ModalOverlayContainer from './ModalOverlayContainer';
import SmallModalDialog from './SmallModalDialog';
import './YesNoDialogModal.css';

interface Props {
    header: string;
    description: string;
    onClickYes: () => void;
    onClickNo: () => void;
}

export default class YesNoDialogModal extends React.Component<Props, {}> {
    render() {
        return (
            <ModalOverlayContainer>
                <SmallModalDialog>
                    <div className="modal-content yes-no-modal">
                        <div className="modal-header">
                            {this.props.header}
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-12">
                                    <p>{this.props.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="row">
                                <div className="col-xs-12 text-center">
                                    <a className="btn btn-default" onClick={this.props.onClickNo}>No</a>
                                    <a className="btn btn-danger" onClick={this.props.onClickYes}>Yes</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SmallModalDialog>
            </ModalOverlayContainer>
        );
    }
}