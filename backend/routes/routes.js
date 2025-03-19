const express = require('express');
const routes = express.Router();

const usuariosController = require("../controllers/usuarios");
const tiposUsuariosController = require("../controllers/tipos_usuarios");

routes.post('/login', usuariosController.login);
routes.post('/usuarios', usuariosController.createUsuario);

routes.get('/usuarios/:cpf', usuariosController.getUsersByCpf);
routes.get('/usuarios', usuariosController.getAllUsers);

routes.delete('/usuarios/:cpf', usuariosController.deleteUsuario);

routes.put('/usuarios/:cpf', usuariosController.updateUsuario);


routes.post('/tiposusuarios', tiposUsuariosController.createTiposUsuarios);

routes.get('/tiposusuarios', tiposUsuariosController.getTiposUsuarios);

routes.delete('/tiposusuarios/:id_tipo', tiposUsuariosController.deleteTiposUsuarios);

