CREATE DATABASE alf-basico;
USE alf-basico;

/* Creacion de la tabla MENU_OPTIONS */

CREATE TABLE `menu_options` (
	`Clave`    int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`titulo`   varchar(50) NOT NULL,
	`rol`      varchar(3)  DEFAULT NULL,
	`orden`	   int(10) NOT NULL DEFAULT 0,
	`route`    varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT current_timestamp,
	`updated_at` datetime,
	`deleted_at` datetime,
	`deleted`    int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Creacion de la tabla USUARIOS */

CREATE TABLE `usuarios` (
  	`clave`            int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  	`nombre`           varchar(50) NOT NULL,
  	`contrasenia`      varchar(250) NOT NULL,
  	`nombre_completo`  varchar(255) DEFAULT NULL,
  	`email`            varchar(255) NOT NULL,
  	`telefono_movil`   varchar(10) DEFAULT NULL,
  	`es_admin`         int(1) NOT NULL DEFAULT 0,
  	`es_admin_grupos`  int(1) NOT NULL DEFAULT 0,
  	`rest_contrasenia` int(1) NOT NULL DEFAULT 1,
  	`fh_restablecer`   date DEFAULT NULL,
  	`cuenta_borrada`   int(1) NOT NULL DEFAULT 0,
	`created_at` 	   timestamp DEFAULT current_timestamp,
	`updated_at`       datetime,
	`deleted_at`       datetime,
	`deleted`          int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Creacion de la tabla GRUPOS */

CREATE TABLE `grupos` (
	`clave`    int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`descripcion`   varchar(50) NOT NULL,
	`created_at` 	   timestamp DEFAULT current_timestamp,
	`updated_at`       datetime,
	`deleted_at`       datetime,
	`deleted`          int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/* Creacion de la tabla REL_USUARIO_GRUPOS */

CREATE TABLE `rel_usuario_grupos` (
	`clave_usuario`    int(10) PRIMARY KEY NOT NULL,
	`clave_grupo`      int(10),
	`created_at` 	   timestamp DEFAULT current_timestamp,
	`updated_at`       datetime,
	`deleted_at`       datetime,
	`deleted`          int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




