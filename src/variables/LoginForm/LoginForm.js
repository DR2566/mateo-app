import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import classes from './LoginForm.module.css';

const LoginForm = (props) => {
  const user = useRef(null);
  const password = useRef(null);
  const [authResult, setAuthResult] = useState(null);

  const onLoginSuccess = () => { 
    props.onSuccessLogin();
  }

  const submitHandler = (event) =>{
    // event.preventDefault();
    console.log('clicked');
    setAuthResult('Logging in');
    let currentUser = user.current.value;
    let currentPassword = password.current.value;
    let jsonAuth = {
      "user": currentUser,
      "password": currentPassword
    }
    if(!!jsonAuth.user && !!jsonAuth.password){
      let resultAuthentication; // response from the server
      let resultText; // this text will be displayed after authentication process
      axios.post('http://192.168.0.115:3333/auth/post', jsonAuth)
        .then((res)=>{
          resultAuthentication = res.data;
          if(resultAuthentication){
            setAuthResult('Successfully authenticated');          
            onLoginSuccess();
          }else{
            setAuthResult('Username or password is wrong');
          }
        })
        .catch((err)=>{
          setAuthResult(err.data);
        });
    }
  }

  return (
    <>
      <div style={{textAlign: 'center'}}>
        <input className={classes.textInput} type="text" ref={user} placeholder="user"/><br/>
        <input className={classes.textInput} type="password" ref={password} placeholder="password"/><br/>
        {/* <button className={classes.button} type="submit">submit</button> */}
        <p className={classes.authResult}>{authResult}</p>
      </div>  
      <Button active block color="light" size="" onClick={submitHandler}>
        <i className="fas fa-sync-alt" /> Log in
      </Button>
    </>
  );
}

export default LoginForm;
