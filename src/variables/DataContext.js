import { React, createContext, useContext, useState } from 'react';

const DataContext = createContext()


const DataContextProvider = (props) => {
  const [graphObject, setGraphObject] = useState(false)

  const changeContextHandler = (newGraphObject) => {
    setGraphObject((prev)=>{
      return newGraphObject
    })
  }

  const context = {
    graphObject: graphObject,
    changeContext: changeContextHandler,
  }

  return (
    <DataContext.Provider value={context}>
        {props.children}
    </DataContext.Provider>
  )
}

export {DataContextProvider, DataContext} 