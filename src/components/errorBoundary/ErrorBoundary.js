import { Component } from 'react';
import img from './error.gif';

import './errorBoundary.scss';

class ErrorBoundary extends Component {

    state = {
        error : false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return (
                <div className='error-boundary'>
                    <img 
                    src={img} 
                    alt="error-img"/>
                    <p> Ooops Error! Something went wrong. 
                        <br/>
                        <br/>
                        Please refresh the page.
                    </p>
        </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;