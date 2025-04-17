const express = require("express");
const routes = express.Router();
const middlewareAuth = require("../middlewares/auth");
const verificarTipoUsuario = require("../middlewares/verificarTipoUsuario");

const usuariosController = require("../controllers/usuarios");
const tiposUsuariosController = require("../controllers/tipos_usuarios");
const turmascontroller = require("../controllers/turmas");

// Rotas públicas
routes.post("/login", usuariosController.login);

const somenteAdmin = [middlewareAuth, verificarTipoUsuario([1])];

routes.post("/usuario/criar",somenteAdmin, usuariosController.createUsuario);
routes.get("/usuarios/:cpf", somenteAdmin, usuariosController.getUsersByCpf);
routes.get("/usuarios", somenteAdmin, usuariosController.getAllUsers);
routes.delete("/usuarios/:cpf", somenteAdmin, usuariosController.deleteUsuario);
routes.put("/usuarios/:cpf", somenteAdmin, usuariosController.updateUsuario);

routes.post("/tiposusuarios", somenteAdmin, tiposUsuariosController.createTiposUsuarios);
routes.get("/tiposusuarios", somenteAdmin, tiposUsuariosController.getTiposUsuarios);
routes.delete("/tiposusuarios/:id_tipo", somenteAdmin, tiposUsuariosController.deleteTiposUsuarios);

routes.post("/turmas/criar", somenteAdmin, turmascontroller.createTurma);
routes.get("/turmas", somenteAdmin, turmascontroller.getAllTurmas);
routes.get("/turmas/:id", somenteAdmin, turmascontroller.getTurmaById);
routes.delete("/turmas/:id", somenteAdmin, turmascontroller.deleteTurma);

routes.post("/turmas/:id/adicionar-aluno", somenteAdmin, turmascontroller.adicionarUsuarioNaTurma);
routes.delete("/turmas/:id/remover-aluno", somenteAdmin, turmascontroller.removerUsuarioDaTurma);

routes.get("/", ...somenteAdmin, (req, res) => {
  res.json({ message: "teste bem sucedido" });
});

module.exports = routes;
