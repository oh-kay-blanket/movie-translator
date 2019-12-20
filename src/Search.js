import React, {useState} from 'react';

const Search = props => (
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
        <input type="text" list="title" name="movieTitle" placeholder="search for a title" onChange={props.handleInput} value={props.query} />
        <datalist id="title">
          {props.topHits.map((hit, i) => (<option key={i} value={hit}></option>))}
        </datalist>
      </form>
    </div>
  </>
)

export default Search
