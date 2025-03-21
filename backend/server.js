const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usuarios = require("./models/usuarios");
const tipos_usuarios = require("./models/tipos_usuarios");
const routes = require("./routes/routes");

const app = express();

// Configuração do CORS para permitir requisições do frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Permite apenas o frontend acessar a API
    credentials: true, // Permite cookies e headers personalizados
  })
);

app.use(express.json());
app.use(cookieParser());

tipos_usuarios.sync();
usuarios.sync();

app.use("/babydiary", routes);

app.listen(3011, () => console.log("Servidor rodando na porta 3011"));
