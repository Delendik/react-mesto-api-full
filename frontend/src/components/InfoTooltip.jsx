import React from 'react';
import styled from 'styled-components'

function InfoTooltip({imageLink, altText, infoText, onClose, display}){
  return(
    <Wrapper display = {display}>
      <Container>
        <Image src={imageLink} alt ={altText} />
        <Title>{infoText}</Title>
        <button className="popup__closeReg" onClick={onClose}></button>
      </Container>
    </Wrapper>
  )
}

export default InfoTooltip;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  visibility: ${({display}) => display==='on' ? 'visible' : 'hidden'};
`;

const Container = styled.div`
  width: 430px;
  height: 330px;
  background: #FFFFFF;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center; 
  @media (max-width:520px){
    width: 280px;
    height: 308px;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  margin-top:60px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #000000;
  margin-top: 32px;
  max-width:358px;
`;