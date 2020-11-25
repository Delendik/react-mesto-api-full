import React from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar:avatarRef.current.value
    });
  } 

  return(
    <div>
      <PopupWithForm 
          title = {'Обновить аватар'}
          name = {'EditProfileAvatar'}
          buttonTitle = {'Сохранить'}
          isOpen = {isOpen}
          children = {
            <>
              <input type="url" ref = {avatarRef} className="popup__input popup__linkForAvatar" name = "linkAvatar" id='linkForAvatar-input'  placeholder="Ссылка на аватар" required />
              <span className='popup__input_error' id='linkForAvatar-input-error'></span>
            </>
          }
          onClose = {onClose}
          onSubmit = {handleSubmit}
        /> 
    </div>
  )
}

export default EditAvatarPopup;
