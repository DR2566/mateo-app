import React from 'react';
import { createContext, useContext } from 'react';

export const SensorData = createContext({
  refreshedData:[],
  getRefreshedData: ()=>{},
})


const DataContextProvider = (props) => {

  const refreshData = () => {
    console.log("regfreshing");
  }

  const context = {
    getRefreshedData: refreshData
  }

  return (
    <SensorData.Provider value={context}>
      {props.children}
    </SensorData.Provider>
  );
}

export default DataContextProvider;
