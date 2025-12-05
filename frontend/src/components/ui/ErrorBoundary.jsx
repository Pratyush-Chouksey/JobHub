import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 text-white">
                    <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
                    <p className="text-slate-400 mb-8">We're sorry, but an unexpected error occurred.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
