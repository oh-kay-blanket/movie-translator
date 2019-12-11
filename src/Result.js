import React from 'react';

const Result = props => (
  <div className="results box">
    <p>Original Title: <b><em>{props.loading ? 'searching...' : props.movieDBOriginalResult}</em></b></p>
    <p>Japanese Title: <b><em>{props.loading ? 'searching...' : props.movieDBJPResult}</em></b></p>
    <br/>
    <p>Data provided by&nbsp;
      <a href="https://www.themoviedb.org/">The Movie Database</a>
    </p>
  </div>
)

export default Result
