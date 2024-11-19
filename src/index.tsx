import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import ErrorBoundary from './shared/components/error-boundary/error-boundary';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);
