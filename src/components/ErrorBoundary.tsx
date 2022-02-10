import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
    children: ReactNode
}

interface State {
    error: null | Error;
    errorInfo: null | ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props ) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.log(`Error : ${this.state.error.toString()}`);
        console.log(`${this.state.errorInfo.componentStack}`);
    }

  render() {
    if (this.state.errorInfo) {
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      
      return this.props.children;
  }
}

export default ErrorBoundary;
