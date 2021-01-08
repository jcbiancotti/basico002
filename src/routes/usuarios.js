const express = require('express');
const router = express.Router();

const helpers = require('./../lib/helpers');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { check, validationResult } = require('express-validator');
const { o_usuario, fill_usuario, db_usuario } = require('./../lib/models');

// RUTAS

router.get('/add', isLoggedIn, (req, res) => {

    var usuario = o_usuario;
    res.render('usuarios/add', {usuario});
});

var validation = [
    // Validaciones del formulario
    check('nombre', 'El nombre de usuario no puede estar vacío').notEmpty(),
    check('email', 'El correo electrónico en obligatorio').notEmpty(),
    check('telefono_movil', 'El número de teléfono móvil no puede estar vacío').notEmpty(),
    check('contrasenia1', 'No puedes dejar la contraseña vacía').notEmpty(),
    check('contrasenia2', 'Debes indicar la contraseña dos veces para mayor seguridad').notEmpty(),
    check('contrasenia2', 'La segunda contraseña debe ser igual a la primera').custom((value, { req }) => value === req.body.contrasenia1)
]

router.post('/add', validation, async (req, res) => {
    
    const { nombre, nombre_completo, email, telefono_movil, es_admin, es_admin_grupos, contrasenia1, contrasenia2 } = req.body; 
    var usuario = fill_usuario({nombre, nombre_completo, email, telefono_movil, es_admin, es_admin_grupos, contrasenia1, contrasenia2});

    const errors = validationResult(req).array();
    if (errors.length > 0) {

        req.flash('message', errors[0].msg);
        console.log(errors);
        res.render('usuarios/add', {usuario});

    } else {

        usuario.es_admin = 0;         
        usuario.es_admin_grupos = 0;
        if (es_admin === 'on'){
            usuario.es_admin = 1;
        }
        if (es_admin_grupos === 'on') {
            usuario.es_admin_grupos = 1;
        }
                
        await pool.query('INSERT INTO usuarios set ?', [db_usuario(usuario)]);
        req.flash('success', 'Usuario creado correctamente');
        res.redirect('/usuarios');
        
    }

});

router.get('/', isLoggedIn, async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');
    res.render('usuarios/list', { usuarios });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {

    const { id } = req.params;

    const usuario = await pool.query('SELECT nombre FROM usuarios WHERE clave = ?', [id]);
    if (usuario.length > 0) {
        await pool.query('DELETE FROM usuarios WHERE clave = ?', [id]);
        req.flash('success', 'El usuario ' + usuario[0]['nombre'] + ' ha sido eliminado');
    }
    res.redirect('/usuarios');

});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE clave = ?', [id]);

    let usuario = usuarios [0];

    if (usuarios [0]['es_admin'] === 1){
        usuario.v_es_admin = 'checked';
    } else {
        usuario.es_admin = 'unchecked';
    }
    if (usuarios [0]['es_admin_grupos'] === 1){
        usuario.v_es_admin_grupos = 'checked';
    } else {
        usuario.v_es_admin_grupos = 'unchecked';
    }

    res.render('usuarios/edit', {usuario});

});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
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
    res.redirect('/usuarios');
    
});

router.get('/informe', isLoggedIn, async (req, res) => {

    res.redirect('/usuarios');
});

module.exports = router;
