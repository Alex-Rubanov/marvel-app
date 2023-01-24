import error from './error.gif';

const ErrorMessage = () => {
    return (
        <img 
            src={error} 
            alt="error-img" 
            style={{ display: 'block', margin: '0 auto', width: '250px', height: '250px', objectFit: 'contain' }}/>
    )
}

export default ErrorMessage;