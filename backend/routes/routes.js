const express = require('express');
const routes = express.Router();

const usuariosController = require("../controllers/usuarios");
const tiposUsuariosController = require("../controllers/tipos_usuarios");
const calendarioController = require('../controllers/calendario')
const rotinaController = require('../controllers/rotina');


routes.post('/login', usuariosController.login);
routes.post('/usuario/criar', usuariosController.createUsuario);

routes.get('/usuarios/:cpf', usuariosController.getUsersByCpf);
routes.get('/usuarios', usuariosController.getAllUsers);

routes.delete('/usuarios/:cpf', usuariosController.deleteUsuario);

routes.put('/usuarios/:cpf', usuariosController.updateUsuario);


routes.post('/tiposusuarios', tiposUsuariosController.createTiposUsuarios);

routes.get('/tiposusuarios', tiposUsuariosController.getTiposUsuarios);

routes.delete('/tiposusuarios/:id_tipo', tiposUsuariosController.deleteTiposUsuarios);


routes.post('/calendario', calendarioController.createCalendario);

routes.get('/calendario', calendarioController.getCalendario);

routes.get('/calendario/data/:data', calendarioController.getCalendarioByDate);

//NEW

routes.delete('/calendario/:id_calendario', calendarioController.deleteCalendarioById);

routes.put('/calendario/:id_calendario', calendarioController.updateCalendarioById);

routes.post('/rotina', rotinaController.createRotina);



routes.get("/", (req, res) => {
    res.json({ message: "teste bem sucedido" });
  });
  

  module.exports = routes;