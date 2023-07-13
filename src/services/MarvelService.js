import { useHttp } from '../hooks/http.hook';
import env from 'react-dotenv';

const useMarvelService = () => {
  const _baseOffset = 210;

  const { request, clearError, process, setProcess } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${env.BASE_URL}/characters?limit=9&offset=${offset}&${env.API_KEY}`);

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${env.BASE_URL}/characters/${id}?&${env.API_KEY}`);

    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${env.BASE_URL}/characters?name=${name}&${env.API_KEY}`);

    return res.data.results.map(_transformCharacter);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description:
        char.description.length > 210 ? `${char.description.slice(0, 210)}...` : char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${env.BASE_URL}/comics?orderBy=issueNumber&limit=8&offset=${offset}&${env.API_KEY}`,
    );

    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${env.BASE_URL}/comics/${id}?${env.API_KEY}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      link: comics.urls[0].url,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} pages`
        : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || 'en-us',
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    getCharacterByName,
    clearError,
    process,
    setProcess,
  };
};

export default useMarvelService;
