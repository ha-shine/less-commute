import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {createStore} from 'redux';
import {StoreState} from './types/index';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers/index';
import {CurrentModal} from './constants/index';

const initialStore: StoreState = {
    selectedWorkAddress: null,
    routesFromSource: [],
    routesFromDestination: [],
    selectedRouteIdFromSource: '',
    selectedRouteIdFromDestination: '',
    currentModal: CurrentModal.EntryDialogModal,
    days: 20,
    additionalAddress: null,
    additionalRoutes: [],
    expandedRouteId: ''
};

const store = createStore<StoreState>(rootReducer, initialStore);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
