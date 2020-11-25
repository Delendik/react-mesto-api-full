const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  readUsers, readUser, createUser, updateUserInfo, updateAvatarInfo, login, getUser,
} = require('../controllers/users');

router.get('/users', auth, readUsers);

router.get('/users/me', auth, getUser);

router.get('/users/:_id', auth, readUser);

router.patch('/users/me', auth, updateUserInfo);

router.patch('/users/me/avatar', auth, updateAvatarInfo);

router.post('/signin', login);

router.post('/signup', createUser);

module.exports = router;
