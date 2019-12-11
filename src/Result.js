import React from 'react';

const Result = props => {

  return (
  <div className="results box">
    <p>Original Title: <b><em>{props.loading ? 'searching...' : props.movieDBOriginalResult}</em></b></p>
    <p>{props.language.name} Title: <b><em>{props.loading ? 'searching...' : props.movieDBTRResult}</em></b></p>
    <br/>
    <p>Data provided by&nbsp;
      <a href="https://www.themoviedb.org/">The Movie Database</a>
    </p>
  </div>
)}

export default Result
