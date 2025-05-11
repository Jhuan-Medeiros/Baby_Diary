require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const usuarios = require("./models/usuarios");
const tipos_usuarios = require("./models/tipos_usuarios");
const routes = require("./routes/routes");
const turmas = require("./models/turmas");
const usuarios_turmas = require("./models/usuarios_turmas");
const conversas = require("./models/conversas");
const mensagens = require("./models/mensagens");
const imagens = require("./models/imagens");

const app = express();

// Configuração para servir arquivos estáticos da pasta "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use(cookieParser());

tipos_usuarios.sync();
// imagens.sync();
usuarios.sync();
turmas.sync();
usuarios_turmas.sync();
conversas.sync();
mensagens.sync();

app.use("/babydiary", routes);

app.listen(3011, () => console.log("Servidor rodando na porta 3011"));