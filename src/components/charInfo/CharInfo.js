import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, process, setProcess } = useMarvelService();

  useEffect(() => updateChar(), [props.charId]);

  const updateChar = () => {
    const { charId } = props;

    if (!charId) return;

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  const imgStyle =
    thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ? { objectFit: 'contain' }
      : { objectFit: 'cover' };
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0
          ? 'There are no available comics for this character. Please choose another one.'
          : null}

        {comics.slice(0, 10).map((item, i) => {
          return (
            <li className="char__comics-item" key={i}>
              <Link to={`/comics/${item.resourceURI.split('/').pop()}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
