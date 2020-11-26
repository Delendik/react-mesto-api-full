import React from 'react';
import styled, { keyframes } from 'styled-components'
import logo from '../images/logo.svg'
import {
  Link
} from "react-router-dom";

function Form({headerButtonName, title, submitButtonName, handleLogin, onSubmit, handleChange}){  
  return(
    <Wrapper >
      <Header>
        <Logo />
        <Link to={headerButtonName === 'Войти' ? "/sign-in" : "/sign-up"}><HeaderButton>{headerButtonName}</HeaderButton></Link>
      </Header>
      <Title>{title}</Title>
      <Forma onSubmit={onSubmit}>
        <Input type="text" placeholder={'Email'} id='email-input' name="email"  required minLength="2" maxLength="40" onChange={handleChange} />
        <span className='popup__input_error' id='name-input-error'></span>
        <Input type="password" placeholder={'Пароль'} id='password-input' name="password" required minLength="2" maxLength="10" onChange={handleChange} />
        <span className='popup__input_error' id='about-input-error'></span>
        <FormButton className="popup__save" handleLogin={handleLogin}>{submitButtonName}</FormButton>
      </Forma>
    </Wrapper>
  )
}

export default Form;

const Wrapper = styled.div`

`;

const Header = styled.div`
  min-height: 74px;
  padding-top: 45px;
  border-bottom: 1px solid rgb(84,84,84, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Logo = styled.div`
  background-image: url(${logo});
  width: 142px;
  height: 33px;
  background-size: cover;
  @media(max-width:880px){
    margin-left:8px;
  }
`;

const opacity = keyframes`
  from {
    transform: opacity(1);
  }
  to {
    transform: opacity(0.6);
  }
`;

const HeaderButton = styled.button`
  margin-top: 6px;
  cursor: pointer;
  box-shadow: none;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  text-align: right;
  color: #FFFFFF;
  background-color: transparent;
  border: none;
  padding: 0;
  :hover{
    animation: ${opacity} 1s linear 1 forwards;
  }
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #FFFFFF;
  margin: 60px auto 50px;
`;

const Forma = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 30px;
  padding: 0;
  width: 358px;
  height: 27px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #CCCCCC;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #CCCCCC;
  box-sizing: border-box;
  padding-bottom:11px;
  @media (max-width: 400px) {
    width: 260px;
  }
`;



const FormButton = styled.button`
  margin-top: 186px;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  border: none;
  background: #FFFFFF;
  border-radius: 2px;
`;