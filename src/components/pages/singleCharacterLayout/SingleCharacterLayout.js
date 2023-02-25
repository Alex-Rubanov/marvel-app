import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="character"
                        content="About character"
                    />
                    <title>{`${name} character page`}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description ? description : 'There is no description for this character.'}</p>
                </div>
                <Link to='/' className="single-comic__back">Go back</Link>
            </div>
    )
}

export default SingleCharacterLayout;