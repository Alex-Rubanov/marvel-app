import { Link } from 'react-router-dom';

import error from '../../../resources/img/404.jpg';
import './page404.scss';


const Page404 = () => {
    return (
        <div className="page404">
            <img src={error} alt="error-page-not-found" className="page404__link-not-found"/>
            <Link to="/" className="page404__link-go-back"> Go Back </Link>
        </div>
    )
}

export default Page404;