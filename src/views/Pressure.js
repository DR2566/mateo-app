import React from 'react';
import GraphCard from 'variables/graphs/GraphCard';


const Pressure = () => {

  return (
    <div className='content'>      
      <GraphCard graphName='Pressure' graphRange={1}  /> 
    </div>
  );
}

export default Pressure;