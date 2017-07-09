import * as React from 'react';
import './App.css';
import TopBar from './containers/TopBar';
import ModalOverlay from './containers/ModalOverlay';
import BodyContainer from './containers/BodyContainer';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <TopBar />
                <div className="container home-container">
                    <BodyContainer />
                    <ModalOverlay />
                </div>
            </div>
        );
    }
}

export default App;
