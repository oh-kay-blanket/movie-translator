import React from 'react';

const Search = props => {
  return (
    <>
      <header>
        <h1><em>MOVIE TITLES IN&nbsp;
          <select value={props.language.key} name='language' onChange={props.handleLanguage}>
            {props.languageList.map((lang, index) => <option key={index} value={index}>
                {lang.name.toUpperCase()}
              </option>
            )}
          </select>
        </em></h1>
      </header>
      <div className="containerH">
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" name="movieTitle" placeholder="search for a title" onChange={props.handleInput} value={props.query} />
        </form>
      </div>
    </>
  )
}

export default Search
