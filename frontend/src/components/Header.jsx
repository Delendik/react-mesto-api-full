import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components'
import logo from '../images/logo.svg'
import closeMenu from '../images/close_button.svg'
import openMenu from '../images/open_menu.svg'

function Header({email, onSignOut}){
  const [menuOpen, setMenuOpen] = useState(false);
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)

  function changeWidth(){
    setWidthWindow(window.innerWidth);
  }

  window.addEventListener('resize', ()=> changeWidth());

  function onClick(){
    setMenuOpen(!menuOpen);
  }

  if(widthWindow>500){
    return(
      <Wrapper >
        <Head>
          <Logo />
          <Container>
            <Email> {email} </Email>
            <HeaderButton onClick = { onSignOut }>Выйти</HeaderButton>
          </Container>
        </Head>
      </Wrapper>
    )
  } else{
    return(
      <Wrapper >
        {menuOpen ? 
        <div>
          <Container>
            <Email> {email} </Email>
            <HeaderButton onClick = { onSignOut }>Выйти</HeaderButton>
          </Container>
          <Head>
            <Logo />
            <Button menuOpen={menuOpen} onClick={onClick}/>
          </Head> 
        </div> : 
        <Head>
          <Logo />
          <Button menuOpen={menuOpen} onClick={onClick}/>
        </Head> }
      </Wrapper>
    )
  }
  
}

export default Header;

const Wrapper = styled.div`

`;

const Head = styled.header`
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

const Container = styled.div`
  display: flex;
  @media(max-width:500px){
    flex-direction: column;
    width: 142px;
    align-items: center;
    margin: 0 auto;
  }
`;

const Email = styled.div`
  margin-top: 6px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: right;
  color: #FFFFFF;
  margin-right: 24px;
  @media(max-width:500px){
    margin: 40px 0 0;
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

const Button = styled.button`
  padding: 0;
  background-image: url(${({menuOpen}) => menuOpen ? closeMenu : openMenu});

  background-position: center;
  background-color: rgba(0, 0, 0, 0);
  background-repeat: no-repeat;
  height: 45px;
  width: 45px;
  border: 0;
  cursor: pointer;
  box-shadow: none;
  :hover{
    animation: ${opacity} 1s linear forwards;
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
  color: #A9A9A9;
  background-color: transparent;
  border: none;
  padding: 0;
  :hover{
    animation: ${opacity} 1s linear 1 forwards;
  }
  @media(max-width:500px){
    margin-top: 18px;
  }
`;