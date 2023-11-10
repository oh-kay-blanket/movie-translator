import React from 'react';

const Result = props => {

  return (
  <div className="results box">
    <h4>Original: <span className="return-title">{props.loading ? 'searching...' : props.movieDBOriginalResult}</span></h4>
    <h4>{props.language.name} ({props.language.engName}): <span className="return-title">{props.loading ? 'searching...' : props.movieDBTRResult}</span></h4>
  </div>
)}

export default Result
