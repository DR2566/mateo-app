import React from 'react';
import GraphCard from 'variables/graphs/GraphCard';


const Humidity = () => {

  return (
    <div className='content'>      
      <GraphCard graphName='Humidity' graphRange={1}  /> 
    </div>
  );

}

export default Humidity;
