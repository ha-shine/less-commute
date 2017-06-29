import * as React from 'react';
import './App.css';
import MainForm from './containers/MainForm';
import TopBar from './components/TopBar';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <TopBar />
                <div className="container home-container">
                    <MainForm />
                </div>
            </div>
        );
    }
}

export default App;
