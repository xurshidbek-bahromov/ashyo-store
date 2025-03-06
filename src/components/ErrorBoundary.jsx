import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {

        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(errorInfo) {
        console.error("Error caught in ErrorBoundary:", errorInfo);

    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
