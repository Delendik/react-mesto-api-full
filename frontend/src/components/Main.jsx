import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}){
  const currentUser = React.useContext(CurrentUserContext);
  
  return(
    <>
      <section className="profile">
        <div className="profile__containerImage">
          <img className="profile__image" src={currentUser.avatar} alt="Аватар" onClick={onEditAvatar} />
        </div>
        <div className="profile__info"> 
          <div className="profile__edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button"  onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__addPicture" onClick={onAddPlace}></button>
      </section>

      <ul className="cardsList">
        {cards.map(card => <Card key={card._id} {...card} onCardClick = {onCardClick} onCardLike = {onCardLike} onCardDelete = {onCardDelete} />)}
      </ul>     
    </>
  )
}

export default Main;