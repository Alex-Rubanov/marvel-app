import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import error from '../../../resources/img/404.jpg';
import './page404.scss';


const Page404 = () => {
    return (
        <div className="page404">
            <Helmet>
                <meta
                    name="404"
                    content="Page doesn't exist"
                />
                <title>404</title>
            </Helmet>
            <img src={error} alt="error-page-not-found" className="page404__link-not-found"/>
            <Link to="/" className="page404__link-go-back"> Go Back </Link>
        </div>
    )
}

export default Page404;