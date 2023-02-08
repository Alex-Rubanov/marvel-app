import { useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList'

import decoration from '../../resources/img/vision.png';

const App = () => {
  
    const [selectedChar, selectChar] = useState(null);

    const onCharSelected = (id) => {
        selectChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            {/* <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> */}
            <ComicsList/>
        </div>
    )
}

export default App;