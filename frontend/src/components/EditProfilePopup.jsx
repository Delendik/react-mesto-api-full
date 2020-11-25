import React  from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext, useState} from 'react';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] =  useState('');
  const [description, setDescription] =  useState('');
    
  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 
  
  return(
    <div>
      <PopupWithForm 
          title = {'Редактировать профиль'}
          name = {'EditProfile'}
          buttonTitle = {'Сохранить'}
          isOpen = {isOpen}
          children = {
            <>
              <input type="text" value={name} className="popup__input popup__name" id='name-input' required minLength="2" maxLength="40" onChange={handleChangeName}/>
              <span className='popup__input_error' id='name-input-error'></span>
              <input type="text" value={description} className="popup__input popup__about" id='about-input' required minLength="2" maxLength="200" onChange={handleChangeDescription}/>
              <span className='popup__input_error' id='about-input-error'></span>
            </>
          }
          onClose = {onClose}
          onSubmit = {handleSubmit}
        />  
    </div>
  )
}

export default EditProfilePopup;