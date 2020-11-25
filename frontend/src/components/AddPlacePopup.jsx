import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onSubmitCard}){
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmitCard({
      name:cardNameRef.current.value,
      link:cardLinkRef.current.value
    });
  } 

  return(
    <div>
      <PopupWithForm 
          title = {'Новое место'}
          name = {'AddCard'}
          buttonTitle = {'Создать'}
          isOpen = {isOpen}
          children = {
            <>
              <input type="text" ref = {cardNameRef} className="popup__input popup__nameOfPlace" name = "name" id='nameOfPlace-input' placeholder="Название" required minLength="1" maxLength="30" /> 
              <span className='popup__input_error' id='nameOfPlace-input-error'></span>
              <input type="url" ref = {cardLinkRef} className="popup__input popup__linkForPicture" name = "link" id='linkForPicture-input' placeholder="Ссылка на картинку" required />
              <span className='popup__input_error' id='linkForPicture-input-error'></span>
            </>
          }
          onClose = {onClose}
          onSubmit = {handleSubmit}
        />  
    </div>
  )
}

export default AddPlacePopup;