import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { setToken, getToken, removeToken } from '../utils/token';
import * as auth from '../auth.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { Route, useHistory} from 'react-router-dom';
import success from '../images/success.svg';
import fail from '../images/fail.svg'

function App() {
  const [isEditProfilePopupOpen, isOpenEditProfile] =  useState(false);
  const [isAddPlacePopupOpen, isOpenAddPlace] =  useState(false);
  const [isEditAvatarPopupOpen, isOpenEditAvatar] =  useState(false);
  const [selectedCard, isOpenSelectedCard] =  useState(null);
  const [currentUser, setCurrentUser] =  useState({});
  const [cards, setCards] =  useState([]);
  const [loginIn, setLoginIn] =  useState(false);
  const [email, setEmail] = useState({ email: ''});
  const [successRegister, setSuccessRegister] =  useState(false);
  const [registerFail, setRegisterFail] =  useState(false);
  const history = useHistory();

  const tokenCheck = () => {
    const token = getToken();
    console.log("Check token");
    console.log(token);
    if (!token) {
      return;
    }
    auth.getContent(token).
    then((res) => {
      if (res) {
        console.log(res);
        setLoginIn(true);
        setEmail(res.email);
        history.push('/');
      }
    })
    .catch(err => {
      if(err.status===401){
        console.log("Токен не передан или передан не в том формате");
      } else {
        console.log("ошибка на сервере");
      }
    });
  }

  useEffect(() => {
    tokenCheck();
  }, []);
  
  useEffect(()=>{
    console.log(loginIn)
    if(!loginIn){
      return;
    }
    Promise.all([ 
      api.getUserInfo(), 
      api.getCardsFromServer() 
    ]) 
    .then( 
      json=>{ 
        const [userInfo, data] = json; 
        console.log(userInfo)
        console.log(data)
        setCurrentUser(userInfo)
        const items = data.map(item => ({ 
          link: item.link,
          likes: item.likes,
          name: item.name,
          _id:item._id,
          owner:item.owner
          })) 
          setCards(items) 
        }
    )
    .catch((err) => { 
      console.log(err);  
    }); 
  }, [loginIn])

  useEffect(() => {
    const handleEsc = (e) => {
      const ESC_CODE = 'Escape' ;
      if (e.code === ESC_CODE) {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => { 
      console.log(err);  
    }); 
  } 

  function handleCardDelete(card){
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id );
      setCards(newCards);
    })
    .catch((err) => { 
      console.log(err);  
    }); 
  }

  function handleEditProfileClick(){
    isOpenEditProfile(true);
  }

  function handleEditAvatarClick(){
    isOpenEditAvatar(true);
  }

  function handleAddPlaceClick(){
    isOpenAddPlace(true);
  }

  function handleUpdateUser(user){
    console.log(user);
    console.log(currentUser);
    api.changeUserInfo(user)
    .then(res=>{
      console.log(res.data);
      setCurrentUser(res.data)
      console.log(res.data);
    })
    .catch((err) => { 
      console.log(err);  
    }); 
    isOpenEditProfile(false);
  }

  function handleUpdateAvatar(avatar){
    api.changeAvatar(avatar)
    .then(res=>{
      setCurrentUser(res.data)
    })
    .catch((err) => { 
      console.log(err);  
    }); 
    isOpenEditAvatar(false);
  }

  function handleAddPlaceSubmit(card){
    api.addNewCard(card).then(
      (newCard) => {
      setCards([...cards, newCard]); 
    })
    .catch((err) => { 
      console.log(err);  
    }); 
    isOpenAddPlace(false);
  }

  function closeAllPopups(){
    isOpenEditProfile(false);
    isOpenEditAvatar(false);
    isOpenAddPlace(false);
    isOpenSelectedCard(null);
  }

  const onRegister = (email, password) =>{
    auth.register(email, password)
    .then((res) => {
      if(res){
        setSuccessRegister(true);
        history.push('/sign-in');
      } else {
        setRegisterFail(true);
        history.push('/sign-up');
      }
    })
    .catch(err => {
      setRegisterFail(true);
      if(err.status===400){
        console.log("Некорректно заполнено одно из полей");
      } else {
        console.log("Ошибка на сервере");
      }
    });
  }
  
  const onLogin = (email, password) => {
    auth.authorize(email, password)
    .then((newdata) => {
      if (newdata.token) {
        setToken(newdata.token);
        handleLogin({email, password});
        history.push('/');
      }
    })
    .catch(err => {
      if(err.status===400){
        console.log("Не передано одно из полей");
      } else if(err.status===401){
        console.log("Пользователь с email не найден или неверный пароль");
      } else {
        console.log("Ошибка на сервере");
      }
    });
  }

  function closeRegStatus(){
    setSuccessRegister(false);
    setRegisterFail(false);
  }

  const handleLogin = (userData) => {
    setEmail(userData.email);
    setLoginIn(true);
  }

  const onSignOut = () => {
    removeToken();
    setLoginIn(false);
  }
  
  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Route path="/sign-in">
            <Login 
              handleLogin={handleLogin} 
              onLogin={onLogin}
            />
            {successRegister ? <InfoTooltip 
                imageLink={success}
                altText='success' 
                infoText='Вы успешно зарегистрировались!'
                onClose={closeRegStatus} 
                display = 'on'
              /> : <InfoTooltip display = 'off'/>
            }
          </Route>

          <Route path="/sign-up">
            <Register handleLogin={handleLogin}
              onRegister={onRegister}
            />
            {registerFail ? <InfoTooltip 
                imageLink={fail}
                altText='fail' 
                infoText='Что-то пошло не так!
                          Попробуйте ещё раз.'
                onClose={closeRegStatus} 
                display = 'on'
              /> : <InfoTooltip display = 'off'/>
            }
          </Route>

          <ProtectedRoute exact path="/" loginIn={loginIn} >
            <Header 
              email={email}
              onSignOut = { onSignOut }
            />
            <Main 
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              onCardClick = {isOpenSelectedCard}
              cards = {cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
            />
            <Footer />
            
            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closeAllPopups} 
              onUpdateUser = {handleUpdateUser} 
            /> 

            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closeAllPopups} 
              onUpdateAvatar = {handleUpdateAvatar}
            /> 

            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen} 
              onClose={closeAllPopups} 
              onSubmitCard = {handleAddPlaceSubmit}
            />

            <PopupWithForm 
              title = {'Вы уверены?'}
              name = {'DeleteCard'}
              buttonTitle = {'Да'}
            /> 
              
            <ImagePopup 
              card = {selectedCard}
              onClose = {closeAllPopups}
            />
          </ProtectedRoute>
        </div>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
