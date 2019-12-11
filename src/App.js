import React,{ Component, useState, useEffect } from 'react';
import Search from './Search';
import Result from './Result';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [movieDBOriginalResult, setMovieDBOriginalResult] = useState('Nothing yet');
  const [movieDBJPResult, setMovieDBJPResult] = useState('Nothing yet');

  const handleSubmit = event => {
    const target = event.target;
    setLoading(true);
    setQuery(target.value);
  }

  // MOVIEDB
  useEffect(() => {
    if (query === "") {
      setLoading(false);
      setMovieDBOriginalResult('Nothing yet');
      setMovieDBJPResult('Nothing yet');
    } else {
      const baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=09bef58264dfd94d2a9fc4dcd061da8f&query=';
      const url = "".concat(baseURL, query);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Use first result
          const movieID     = data.results[0].id;
          const altTitleURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=09bef58264dfd94d2a9fc4dcd061da8f&append_to_response=translations`;

          fetch(altTitleURL)
            .then(altTitleResponse => altTitleResponse.json())
            .then(altTitleData => {
              if (altTitleData.translations.translations.some(translation => translation.iso_3166_1 == "JP")) {
                altTitleData.translations.translations.forEach(translation => {
                  if (translation.iso_3166_1 == "JP") {
                    setMovieDBOriginalResult(altTitleData.title);
                    setMovieDBJPResult(translation.data.title);
                    setLoading(false);
                  }
                })
              } else {
                setMovieDBOriginalResult(altTitleData.title);
                setMovieDBJPResult('No Japanese title found');
                setLoading(false);
              }
            })
            .catch(altTitleErr => {
              setMovieDBOriginalResult('No Japanese title found');
              setMovieDBJPResult('No Japanese title found');
              setLoading(false);
            })
        })
        .catch(err => {
          setMovieDBOriginalResult('No title found');
          setMovieDBJPResult('No title found');
          setLoading(false);
        })
    }
  }, [query])

  return (
    <>
      <Search
        query={query}
        handleSubmit={handleSubmit}
      />
      <Result
        loading={loading}
        movieDBOriginalResult={movieDBOriginalResult}
        movieDBJPResult={movieDBJPResult}
      />
    </>
  )
}

export default App
