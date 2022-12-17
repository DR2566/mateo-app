import React from 'react';
import Login from './Login';
import { useState } from 'react';
import Test from 'components/TestSensors/Test';

const DevOptions = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const successLoggin = () => {
    setLoggedIn(true)
  }

  return(
    <div className='content'>
      {(loggedIn)
        ? <Test/>
        : <Login onSuccessLogin={successLoggin}/>
      }      
    </div>
  )
}

export default DevOptions;
