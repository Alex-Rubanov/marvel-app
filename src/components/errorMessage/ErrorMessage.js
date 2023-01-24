import error from './error_v2.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <div className='error-message'>
            <img 
            src={error} 
            alt="error-img"/>
            <p> Ooops Error! Something went wrong. 
                <br/>
                <br/>
                Please refresh the page.
            </p>
        </div>
    )
}

export default ErrorMessage;