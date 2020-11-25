import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({link, likes, name, owner, _id, onCardClick, onCardLike, onCardDelete}){
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () =>{
    onCardClick({link, name});
  }

  const handleLikeClick = () =>{
    onCardLike({_id, likes});
  }

  const handleDeleteClick = () =>{
    onCardDelete({_id});
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'card__trash' : 'card__trash_hidden'}`
  ); 

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'card__like_black' : 'card__like'}`
  ); 
  
  return(
    <div className="templateCard">
        <li className="card">
          <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
          <img src={link} alt="Место из названия" className="card__picture"  onClick={handleCardClick} />
          <div className="card__description">
            <h3 className="card__title">{name}</h3>
            <div className="card__likeContainer">
              <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
              <span className="card__likeNumbers">{likes.length}</span>
            </div>
          </div>
        </li>
      </div>
  )
}

export default Card;