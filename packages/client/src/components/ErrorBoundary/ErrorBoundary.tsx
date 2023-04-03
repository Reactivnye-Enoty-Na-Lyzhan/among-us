import React, {ErrorInfo} from 'react';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
    children: React.ReactNode;
  }
interface ErrorBoundaryState {
    hasError: boolean,
    error: Error | null,
    errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>  {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError:false, 
            error: null, 
            errorInfo: null 
        };
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
      }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError || this.state.error) {
            return (
                <div className='error-boundary'>
                    <h3>Что-то поломалось...</h3>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children; 
    }
}
