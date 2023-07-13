import { useState, useEffect, useRef, useMemo } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import logo from '../../assets/img/marvel-logo.jpg';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      return new Error('Unexpected state process');
  }
};

const CharList = (props) => {
  const randomOffset = Math.floor(Math.random() * (600 - 100) + 100);

  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(randomOffset);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  };

  const isImgFound = (thumbnail) => {
    return (
      thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
      thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'
    );
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' };
      const thumbnail = isImgFound(item.thumbnail) ? logo : item.thumbnail;

      return (
        <li
          key={item.id}
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}>
          <img src={thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">
            {item.name.length > 25 ? `${item.name.slice(0, 25)}... ` : item.name}
          </div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newItemLoading);
  }, [process]);

  return (
    <div className="char__list">
      {elements}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ visibility: charEnded ? 'hidden' : 'visible' }}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
