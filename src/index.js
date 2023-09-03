import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store, persistor} from "./redux";
import {PersistGate} from "redux-persist/integration/react";


ReactDOM.render(
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}><App/></Provider>
    </PersistGate>,
    document.getElementById('root')
);
