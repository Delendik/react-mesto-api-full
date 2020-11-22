const router = require('express').Router();
// const auth = require('../middlewares/auth');
const {
  readUsers, readUser, createUser, updateUserInfo, updateAvatarInfo, login,
} = require('../controllers/users');

// router.get('/users', auth, readUsers);
router.get('/users', readUsers);

// router.get('/users/:_id', auth, readUser);
router.get('/users/:_id', readUser);
// router.post('/users', createUser);

// router.patch('/users/me', auth, updateUserInfo);
router.patch('/users/me', updateUserInfo);

// router.patch('/users/me/avatar', auth, updateAvatarInfo);
router.patch('/users/me/avatar', updateAvatarInfo);

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
