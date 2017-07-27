import * as React from 'react';

export default class LargeModalDialog extends React.Component<{}, {}> {
    render() {
        return (
            <div className="modal-dialog modal-lg">
                {this.props.children}
            </div>
        );
    }
}