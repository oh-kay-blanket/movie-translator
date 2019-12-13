import React from 'react';

const Result = props => {

  return (
  <div className="results box">
    <h4>Original: <span className="return-title">{props.loading ? 'searching...' : props.movieDBOriginalResult}</span></h4>
    <h4>{props.language.name}: <span className="return-title">{props.loading ? 'searching...' : props.movieDBTRResult}</span></h4>
    <br/>
    <p>Data provided by&nbsp;
      <a href="https://www.themoviedb.org/">The Movie Database</a>
    </p>
  </div>
)}

export default Result
