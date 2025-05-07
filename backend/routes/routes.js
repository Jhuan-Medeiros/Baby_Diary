const express = require("express");
const routes = express.Router();
const middlewareAuth = require("../middlewares/auth");
const verificarTipoUsuario = require("../middlewares/verificarTipoUsuario");

const usuariosController = require("../controllers/usuarios");
const tiposUsuariosController = require("../controllers/tipos_usuarios");
const turmascontroller = require("../controllers/turmas");
const conversasController = require("../controllers/conversas");
const mensagensController = require("../controllers/mensagens");

// Rotas públicas
routes.post("/login", usuariosController.login);

const somenteAdmin = [middlewareAuth, verificarTipoUsuario([1])];

// Rotas de usuário
routes.post("/usuario/criar", somenteAdmin, usuariosController.createUsuario);
routes.get("/usuarios/:cpf", somenteAdmin, usuariosController.getUsersByCpf);
routes.get("/usuarios", somenteAdmin, usuariosController.getAllUsers);
routes.delete("/usuarios/:cpf", somenteAdmin, usuariosController.deleteUsuario);
routes.put("/usuarios/:cpf", somenteAdmin, usuariosController.updateUsuario);

// Rotas de tipos de usuário
routes.post("/tiposusuarios", somenteAdmin, tiposUsuariosController.createTiposUsuarios);
routes.get("/tiposusuarios", somenteAdmin, tiposUsuariosController.getTiposUsuarios);
routes.delete("/tiposusuarios/:id_tipo", somenteAdmin, tiposUsuariosController.deleteTiposUsuarios);

// Rotas de turmas
routes.post("/turmas/criar", somenteAdmin, turmascontroller.createTurma);
routes.get("/turmas", turmascontroller.getAllTurmas);
routes.get("/turmas/:id", turmascontroller.getTurmaById);
routes.delete("/turmas/:id", somenteAdmin, turmascontroller.deleteTurma);
routes.post("/turmas/:id/adicionar-aluno", somenteAdmin, turmascontroller.adicionarUsuarioNaTurma);
routes.delete("/turmas/:id/remover-aluno", somenteAdmin, turmascontroller.removerUsuarioDaTurma);

// Teste
routes.get("/", ...somenteAdmin, (req, res) => {
  res.json({ message: "teste bem sucedido" });
});

// 🔥 Rotas de chat diretamente aqui
routes.post("/conversas", middlewareAuth, conversasController.criarConversa);
routes.get("/conversas/:idUsuario", middlewareAuth, conversasController.getConversasDoUsuario);

// (se tiver mensagens também, adicione aqui)
routes.post("/mensagens", middlewareAuth, mensagensController.enviarMensagem);
routes.get("/mensagens/:idConversa", middlewareAuth, mensagensController.buscarMensagensPorConversa);

module.exports = routes;
