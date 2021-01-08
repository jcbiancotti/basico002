const express = require('express');
const router = express.Router();

const passport = require('passport');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  // Donde ir según el resultado
  successRedirect: '/desktop',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/desktop',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/');
});

// isLoggedIn === true permite el acceso
router.get('/desktop', isLoggedIn, (req, res) => {
  res.render('desktop');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('auth/profile');
});

router.post('/profile/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { nombre, nombre_completo, email, telefono_movil, es_admin, es_admin_grupos } = req.body; 

  // Se crea el objeto con lo recibido
  let newUser = {
      nombre,           
      nombre_completo,  
      email,            
      telefono_movil
  };
  newUser.es_admin = 0;         
  newUser.es_admin_grupos = 0;
  if (es_admin === 'on'){
      newUser.es_admin = 1;
  }
  if (es_admin_grupos === 'on'){
      newUser.es_admin_grupos = 1;
  }

  // Saving in the Database
  await pool.query('UPDATE usuarios set ? WHERE clave = ?', [newUser, id]);
  req.flash('success', 'Datos actualizados');

  res.redirect('/desktop');

});
module.exports = router;
