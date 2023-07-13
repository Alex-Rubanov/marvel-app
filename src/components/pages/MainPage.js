import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharSearchForm from '../charSearchForm.js/CharSearchForm';

import decoration from '../../assets/img/vision.png';

const MainPage = () => {
  const [selectedChar, selectChar] = useState(null);
  const [visible, setVisible] = useState(true);

  const onCharSelected = (id) => {
    selectChar(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 200
      ) {
        return setVisible(false);
      }

      setVisible(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="characters" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <div style={{ position: 'sticky', top: '5px' }}>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
      </div>
      <img
        className={visible ? 'bg-decoration visible' : 'bg-decoration invisible'}
        src={decoration}
        alt="vision"
      />
    </>
  );
};

export default MainPage;
