import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import Loading from 'components/Loading/Loading';

import classes from './LoginForm.module.css';

const LoginForm = (props) => {
  const user = useRef(null);
  const password = useRef(null);
  const [authResult, setAuthResult] = useState(null);

  const onLoginSuccess = () => { 
    props.onSuccessLogin();
  }

  const submitHandler = (event) =>{
    setAuthResult('Logging in');
    let currentUser = user.current.value;
    let currentPassword = password.current.value;
    let jsonAuth = {
      "user": currentUser,
      "password": currentPassword
    }
    if(!!jsonAuth.user && !!jsonAuth.password){
      let resultAuthentication; // response from the server
      axios.post('http://student.gml.cz:3333/auth/post', jsonAuth)
        .then((res)=>{
          resultAuthentication = res.data;
          if(resultAuthentication){
            setAuthResult('Successfully authenticated');          
            onLoginSuccess();
          }else if(resultAuthentication === ''){
            setAuthResult('Something went wrong');
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
        <p className={classes.authResult}>{authResult}</p>
        {(authResult === 'Logging in')
          ? <Loading siteLoading="false"/>
          : (authResult === 'Something went wrong' || authResult === 'Username or password is wrong')
            ? <i className="nc-icon nc-simple-remove"/>
            : null
        }
      </div>  
      <Button active block color="light" size="" onClick={submitHandler}>
        <i className="fas fa-sync-alt" /> Log in
      </Button>
    </>
  );
}

export default LoginForm;
