import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';

import App from './components/app/App';
import './index.css';
import { createStore } from './services/store';
import { routeConfig } from './shared/routes';

const store = createStore();

const router = createBrowserRouter(routeConfig, {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App router={router} />
        </React.StrictMode>
    </Provider>,
);
