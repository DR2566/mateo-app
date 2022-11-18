import React from 'react';

const Loading = () => {
  return (
    <div className="content">
      <h3 style={{textAlign: "center"}}>loading...</h3>
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
