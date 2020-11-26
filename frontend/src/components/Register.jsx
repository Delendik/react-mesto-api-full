import React, { useState } from 'react';
import styled from 'styled-components'
import Form from './Form';
import { Link } from "react-router-dom";

function Register({onRegister, handleLogin}){

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
    onRegister(email, password);
  }

  return(
    <Wrapper>
      <Form 
        headerButtonName = {'Войти'} 
        title = {'Регистрация'}
        submitButtonName = {'Зарегистрироваться'}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        handleLogin={handleLogin}
      />
      <Link to = "/sign-in"><Subtitle>Уже зарегистрированы? Войти</Subtitle></Link>
    </Wrapper>
  )
}

export default Register;

const Wrapper = styled.div`

`;

const Subtitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #FFFFFF;
  margin-top: 15px;
  cursor: pointer;
`;