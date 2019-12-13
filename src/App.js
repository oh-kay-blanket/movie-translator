import React,{ Component, useState, useEffect } from 'react';
import Search from './Search';
import Result from './Result';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState({name: "Japanese", code: "JP", key: 10});
  const [query, setQuery] = useState('');
  const [movieDBOriginalResult, setMovieDBOriginalResult] = useState('Nothing yet');
  const [movieDBTRResult, setmovieDBTRResult] = useState('Nothing yet');

  const languageList = [
    {name: "Bulgarian", code: "BG"},
    {name: "Czech", code: "CZ"},
    {name: "Danish", code: "DK"},
    {name: "Dutch", code: "NL"},
    {name: "French", code: "FR"},
    {name: "German", code: "DE"},
    {name: "Greek", code: "GR"},
    {name: "Hebrew", code: "IL"},
    {name: "Italian", code: "IT"},
    {name: "Norwegian", code: "NO"},
    {name: "Japanese", code: "JP"},
    {name: "Mandarin (China)", code: "CN"},
    {name: "Mandarin (Hong Kong)", code: "HK"},
    {name: "Spanish", code: "ES"},
    {name: "Persian", code: "IR"},
    {name: "Polish", code: "PL"},
    {name: "Portuguese (Brazil)", code: "BR"},
    {name: "Portuguese (Portugal)", code: "PT"},
    {name: "Russian", code: "RU"},
    {name: "Slovak", code: "SK"},
    {name: "Serbian", code: "RS"},
    {name: "Swedish", code: "SE"},
    {name: "Thai", code: "TH"},
    {name: "Turkish", code: "TR"},
    {name: "Ukranian", code: "UK"},
  ];

  const handleInput = event => {
    const target = event.target;
    setLoading(true);
    setQuery(target.value);
  }

  const handleLanguage = event => {
    const target = event.target;
    setLanguage(languageList[target.value]);
  }

  // MOVIEDB
  useEffect(() => {
    if (query === "") {
      setLoading(false);
      setMovieDBOriginalResult('Nothing yet');
      setmovieDBTRResult('Nothing yet');
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
              console.log(altTitleData)
              if (altTitleData.translations.translations.some(translation => translation.iso_3166_1 === language.code)) {
                altTitleData.translations.translations.forEach(translation => {
                  if (translation.iso_3166_1 === language.code) {
                    if (translation.data.title !== "") {
                      setmovieDBTRResult(translation.data.title);
                    } else {
                      setmovieDBTRResult(`No ${language.name} title found`);
                    }
                    setMovieDBOriginalResult(altTitleData.title);
                    setLoading(false);
                  }
                })
              } else {
                setMovieDBOriginalResult(altTitleData.title);
                setmovieDBTRResult(`No ${language.name} title found`);
                setLoading(false);
              }
            })
            .catch(altTitleErr => {
              setMovieDBOriginalResult(`No ${language.name} title found`);
              setmovieDBTRResult(`No ${language.name} title found`);
              setLoading(false);
            })
        })
        .catch(err => {
          setMovieDBOriginalResult('No title found');
          setmovieDBTRResult('No title found');
          setLoading(false);
        })
    }
  }, [language, query])

  return (
    <>
      <Search
        language={language}
        languageList={languageList}
        query={query}
        handleLanguage={handleLanguage}
        handleInput={handleInput}
      />
      <Result
        language={language}
        loading={loading}
        movieDBOriginalResult={movieDBOriginalResult}
        movieDBTRResult={movieDBTRResult}
      />
    </>
  )
}

export default App
