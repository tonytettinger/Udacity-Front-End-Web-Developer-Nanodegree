import React, {
    Component
} from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null
        };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({
              hasError: true,
                  error: error,
                  info: info
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1 > Something went wrong. < /h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary