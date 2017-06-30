import * as React from 'react';
import './App.css';
import MainForm from './containers/MainForm';
import TopBar from './components/TopBar';
import ModalOverlay from './containers/ModalOverlay';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <TopBar />
                <div className="container home-container">
                    <MainForm />
                    <ModalOverlay />
                </div>
            </div>
        );
    }
}

export default App;
