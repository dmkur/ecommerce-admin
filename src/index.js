import {createRoot} from 'react-dom/client';
import {App} from './App';

import {Provider} from "react-redux";
import {store, persistor} from "./redux";
import {PersistGate} from "redux-persist/integration/react";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}><App/></Provider>
    </PersistGate>
);
