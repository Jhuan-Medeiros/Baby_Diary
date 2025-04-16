const Sequelize = require("sequelize");
const database = require("../config/sequelize");

// Define models without associations or imports between them
const TiposUsuarios = database.define(
  "tipos_usuarios",
  {
    id_tipo: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // other fields...
  },
  {
    timestamps: false,
  }
);

const Usuarios = database.define(
  "usuarios",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_tipo: {
      type: Sequelize.INTEGER,
      defaultValue: "usuario",
      allowNull: false,
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Turmas = database.define("turmas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const UsuariosTurmas = database.define("usuarios_turmas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: Sequelize.INTEGER,
  },
  turmaId: {
    type: Sequelize.INTEGER,
  },
}, {
  timestamps: false,
});

// Set up associations after all models are defined
TiposUsuarios.hasOne(Usuarios, {
  foreignKey: "id_tipo",
});

Usuarios.belongsTo(TiposUsuarios, {
  foreignKey: "id_tipo",
});

Usuarios.belongsToMany(Turmas, {
  through: UsuariosTurmas,
  foreignKey: "usuarioId",
  as: "turmas"
});

Turmas.belongsToMany(Usuarios, {
  through: UsuariosTurmas,
  foreignKey: "turmaId",
  as: "usuarios"
});

// Export all models
module.exports = {
  TiposUsuarios,
  Usuarios,
  Turmas,
  UsuariosTurmas,
  database
};