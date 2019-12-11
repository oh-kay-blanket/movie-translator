import React from 'react';

const Search = props => (
  <>
    <header>
      <h1><em>MOVIE TITLES IN JAPANESE</em></h1>
    </header>
    <div className="containerH">
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" name="movieTitle" placeholder="search for a title" onChange={props.handleSubmit} value={props.query} />
      </form>
    </div>
  </>
)

export default Search
