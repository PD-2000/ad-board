const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/google',
  passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/user/no-permission'}),
  (req, res) => {
    res.redirect('/user/logged');
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/user/logout');
  });
});

module.exports = router;