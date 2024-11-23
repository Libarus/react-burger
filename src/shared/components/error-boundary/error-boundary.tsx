import { Component } from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

/**
 * Компонент ErrorBoundary - граница ошибок для отлова ошибок рендера
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null };
    }

    /**
     * Updates state with error information when a child component throws an error.
     * @param {Error} error - The error thrown by a child component
     * @returns {ErrorBoundaryState} The updated state with the error
     */
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    render() {
        const { error } = this.state as ErrorBoundaryState;

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

export default ErrorBoundary;
