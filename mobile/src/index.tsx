import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {createStore} from 'redux';
import {StoreState} from './types/index';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers/index';

const initialStore: StoreState = {
    selectedHomeAddress: null,
    selectedWorkAddress: null
};

const store = createStore<StoreState>(rootReducer, initialStore);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
