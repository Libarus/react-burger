import { Component } from 'react';

import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    state = {
        error: null,
    };

    static getDerivedStateFromError(error) {
        return { error };
    }

    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div>
                    <h1>Ошибка в компоненете - {error.message}</h1>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node
}

export default ErrorBoundary;
