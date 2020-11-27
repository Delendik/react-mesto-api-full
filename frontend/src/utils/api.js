import { getToken} from '../utils/token';

class Api{
  constructor({url, headers}){
    this.url = url;
    this.headers = headers;
  }
  
  getUserInfo(){
    return fetch(`${this.url}/users/me`, {
      headers: this.getHeaders()
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  getCardsFromServer(){
    return fetch(`${this.url}/cards`, {
      headers: this.getHeaders()
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeUserInfo({name, about}){
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({name, about})
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeAvatar(items){
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(items)
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  addNewCard(items){
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({name:items.name, link: items.link})
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  deleteCard(id){
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(id, isLiked){
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: isLiked ?  'PUT' : 'DELETE',
      headers: this.getHeaders()
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  _getResponseData(res){    
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getHeaders(){
    const token = getToken(); 
    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    }
  }
}
const token = getToken();

const api = new Api({
  url: 'http://api.delendik.students.nomoreparties.space',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

export default api;
