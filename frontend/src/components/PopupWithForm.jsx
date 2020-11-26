import React from 'react';

function PopupWithForm({title, name, children, buttonTitle, isOpen, onClose, onSubmit}){
  return(
    <div className={isOpen ? `popup popup${name} popup_opened` : `popup popup${name}`}>
          <div className="popup__container">
            <h3 className="popup__title">{title}</h3>
            <form  className={`popup__form popup__form${name}`} onSubmit = {onSubmit}>
              {children}
              <button className="popup__save" >{buttonTitle}</button>
            </form>
            <button className="popup__close" onClick={onClose}></button>
          </div>
        </div>
  )
}

export default PopupWithForm;