const express = require("express");
const cors = require("cors");
const usuarios = require("./models/usuarios");
const tipos_usuarios = require("./models/tipos_usuarios");
const routes = require("./routes/routes");
const cookieParser = require('cookie-parser')


tipos_usuarios.sync();
usuarios.sync();


const app = express();
app.use("/babydiary", routes);

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.listen(3011, console.log("servidor rodando na porta 3001"));