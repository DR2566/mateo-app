import React from 'react';
import GraphCard from 'variables/graphs/GraphCard';
import { useState, useEffect } from 'react';
import Loading from 'components/Loading/Loading';
import { refreshDataChart } from 'variables/charts';


const Humidity = () => {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshData = () =>{
    setIsLoaded(false);
    refreshDataChart()
      .then((data)=>{
        setData(prev=>data);
        setIsLoaded(true);
      })
  }

  useEffect(() => {
    refreshData();
  }, []);



  if(!isLoaded){
    return(
      <Loading/>      
    )
  }else{
    return (
      <div className='content'>      
        <GraphCard graph={data.graphs.Humidity} graphRange='Variable data time' onRefresh={refreshData}/>
      </div>
    );
  }
}

export default Humidity;
