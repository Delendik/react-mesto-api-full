const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  readCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, readCards);

router.post('/cards', auth, createCard);

router.delete('/cards/:_id', auth, deleteCard);

router.put('/cards/:_id/likes', auth, likeCard);

router.delete('/cards/:_id/likes', auth, dislikeCard);

module.exports = router;
