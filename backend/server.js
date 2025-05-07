const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usuarios = require("./models/usuarios");
const tipos_usuarios = require("./models/tipos_usuarios");
const routes = require("./routes/routes");
const turmas = require("./models/turmas");
const usuarios_turmas = require("./models/usuarios_turmas");
const conversas = require("./models/conversas");
const mensagens = require("./models/mensagens");


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use(cookieParser());

tipos_usuarios.sync();
usuarios.sync();
turmas.sync();
usuarios_turmas.sync();
conversas.sync();
mensagens.sync();

app.use("/babydiary", routes);

app.listen(3011, () => console.log("Servidor rodando na porta 3011"));
