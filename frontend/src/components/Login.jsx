import React, { useState } from 'react';
import Form from './Form';

function Login({handleLogin, onLogin, handlePopupFail}){
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password){
      return;
    }
    onLogin(email, password)
  }

  return(
      <Form
        headerButtonName = {'Регистрация'} 
        title = {'Вход'}
        submitButtonName = {'Войти'}
        handleLogin={handleLogin}
        onSubmit={handleSubmit}
        handleChange={handleChange}
      />
  )
}

export default Login;