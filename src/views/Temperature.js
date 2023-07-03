import React from 'react';
import GraphCard from 'variables/graphs/GraphCard';

const Temperature = () => {
  return (
    <div className='content'>      
      <GraphCard graphName='Temperature' graphRange={1}  /> 
    </div>
  );
}

export default Temperature;
