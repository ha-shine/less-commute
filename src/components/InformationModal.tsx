import * as React from 'react';
import * as constants from '../constants/index';
import SimpleDialogModal from './SimpleDialogModal';
import './InformationModal.css';

interface Props {
    closeModal: () => void;
}
export default class InformationModal extends React.Component<Props, {}> {
    render() {
        const header = (
            <div className="modal-header text-center">
                <h5>Information</h5>
            </div>
        );

        const body = (
            <div className="modal-body">
                <p>
                    Less Commute is a hobby project with the aim of reducing commute
                    time for people in Singapore by providing necessary tools. This is
                    an open source project and anyone can contribute <a href={constants.GITHUB_LINK}>here</a>.
                    Contact me for bug fixes and feature requests.
                </p>
                <p className="text-center">
                    <br/>Built with <span className="ion-heart" />
                </p>
            </div>
        );

        const footer = (
            <div className="modal-footer">
                <div className="row text-center social-links">
                    <div className="col-xs-4">
                        <a href={constants.GITHUB_LINK}>
                            <span className="ion-social-github" />
                        </a>
                    </div>
                    <div className="col-xs-4">
                        <a href={constants.TWITTER_LINK}>
                            <span className="ion-social-twitter" />
                        </a>
                    </div>
                    <div className="col-xs-4">
                        <a href={"mailto:"+ constants.EMAIL}>
                            <span className="ion-android-mail" />
                        </a>
                    </div>
                </div>
            </div>
        )

        return (
            <SimpleDialogModal
                header={header}
                body={body}
                footer={footer}
                closeable={true}
                onClose={this.props.closeModal}
            />
        );
    }
}