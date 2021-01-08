const helpers = require('./helpers');

const modelos = {};

// Modelo del objeto usuario
modelos.o_usuario = () => {

    const obj_usuario =  { 
        nombre: null, 
        nombre_completo: null, 
        email: null, 
        telefono_movil: null, 
        es_admin: null, 
        es_admin_grupos: null,
        contrasenia: null,
        contrasenia1: null,
        contrasenia2: null, 
        b_es_admin: null,
        b_es_admin_grupos: null,
        rest_contrasenia: null, 
        fh_restablecer: null,   
        cuenta_borrada: 0 
    };
    obj_usuario.nombre = '';
    obj_usuario.b_es_admin = false;
    obj_usuario.b_es_admin_grupos = false;
    obj_usuario.es_admin_chk = 'unchecked';
    obj_usuario.es_admin_grupos_chk = 'unchecked';

    return obj_usuario;
};

modelos.fill_usuario = (argumentos) => {

    const obj_usuario = {};
    obj_usuario.nombre = argumentos.nombre;
    obj_usuario.nombre_completo = argumentos.nombre_completo; 
    obj_usuario.email = argumentos.email; 
    obj_usuario.telefono_movil = argumentos.telefono_movil; 
    obj_usuario.es_admin = argumentos.es_admin; 
    obj_usuario.es_admin_grupos = argumentos.es_admin_grupos; 
    obj_usuario.contrasenia = argumentos.contrasenia1;
    obj_usuario.contrasenia1 = argumentos.contrasenia1;
    obj_usuario.contrasenia2 = argumentos.contrasenia2;
    if (obj_usuario.es_admin === 1) {
        obj_usuario.b_es_admin = true;
        obj_usuario.es_admin_chk = 'checked';
    } else {
        obj_usuario.b_es_admin = false;
        obj_usuario.es_admin_chk = 'unchecked';
    }
    if (obj_usuario.es_admin_grupos === 1) {
        obj_usuario.b_es_admin_grupos = true;
        obj_usuario.es_admin_grupos_chk = 'checked';
    } else {
        obj_usuario.b_es_admin_grupos = false;
        obj_usuario.es_admin_grupos_chk = 'unchecked';
    }
    return obj_usuario;
};

// Estructura del objeto "usuario" en la base de datos
modelos.db_usuario = (argumentos) => {

    console.log(argumentos);
    
    const obj_usuario = {};
    obj_usuario.nombre = argumentos.nombre;
    obj_usuario.nombre_completo = argumentos.nombre_completo; 
    obj_usuario.email = argumentos.email; 
    obj_usuario.telefono_movil = argumentos.telefono_movil; 
    obj_usuario.es_admin = argumentos.es_admin; 
    obj_usuario.es_admin_grupos = argumentos.es_admin_grupos; 
    try{
        obj_usuario.contrasenia = helpers.encryptPassword(argumentos.contrasenia1);
    } catch (err) {
        console.log(err);
    }
    obj_usuario.rest_contrasenia = 0; 
    obj_usuario.fh_restablecer = null;   
    obj_usuario.cuenta_borrada = 0; 

    return obj_usuario;
};
// Modelo de ...




module.exports = modelos;
