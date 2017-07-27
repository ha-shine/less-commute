import * as React from 'react';

export default class SmallModalDialog extends React.Component<{}, {}> {
    render() {
        return (
            <div className="modal-dialog modal-sm">
                {this.props.children}
            </div>
        );
    }
}