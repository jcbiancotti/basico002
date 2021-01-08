const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'nombre',
  passwordField: 'contrasenia',
  passReqToCallback: true
}, async (req, nombre, contrasenia, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
  if (rows.length > 0) {

    const user = rows[0];

    const validPassword = await helpers.matchPassword(contrasenia, user.contrasenia);
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.nombre));
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El usuario indicado no existe.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  // Los campos que recibo del formulario
  usernameField: 'nombre',
  passwordField: 'contrasenia',
  passReqToCallback: true
}, async (req, nombre, contrasenia, done) => {

  // Extrae el fullname del req.body
  const { nombre_completo, email, telefono_movil, es_admin, es_admin_grupos } = req.body;
  
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
  newUser.rest_contrasenia = 0; 
  newUser.fh_restablecer = null;   
  newUser.cuenta_borrada = 0;   
  newUser.contrasenia = await helpers.encryptPassword(contrasenia);

  // Saving in the Database
  const result = await pool.query('INSERT INTO usuarios SET ? ', [newUser]);
  newUser.clave = result.insertId;
  return done(null, newUser);
  
}));

// Guarda en la session la clave del newUser de despues del Insert (user)
passport.serializeUser((user, done) => {
  done(null, user.clave);
});

passport.deserializeUser(async (clave, done) => {

  const rows = await pool.query('SELECT * FROM usuarios WHERE clave = ?', [clave]);

  rows[0]['v_es_admin'] = 'unchecked';
  rows[0]['v_es_admin_grupos'] = 'unchecked';
  if (rows[0]['es_admin'] === 1){
    rows[0]['v_es_admin'] = 'checked';
  }
  if (rows[0]['es_admin_grupos'] === 1){
    rows[0]['v_es_admin_grupos'] = 'checked';
  }

  done(null, rows[0]);
});
