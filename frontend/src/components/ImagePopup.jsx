import React from 'react';

function ImagePopup({card, onClose}){
  return (
    card ? (
      <div className={"popup popupPicture popup_opened"}>
        <div className="popupPicture__container">
          <img src={card.link} alt="Место из названия" className="popupPicture__image" />
          <h3 className="popupPicture__title">{card.name}</h3>
          <button className="popup__close" onClick={onClose}></button>
        </div>
      </div>
    ) : null)
  
}

export default ImagePopup;