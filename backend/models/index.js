const Sequelize = require("sequelize");
const database = require("../config/sequelize");

// MODELS

const TiposUsuarios = database.define("tipos_usuarios", {
  id_tipo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  timestamps: false,
});

const Usuarios = database.define("usuarios", {
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
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

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

const Conversas = database.define("conversas", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario1_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  usuario2_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

const Mensagens = database.define("mensagens", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  texto: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Usuarios,
      key: "id",
    },
  },
  id_conversa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Conversas,
      key: "id",
    },
  },
}, {
  timestamps: true,
});

// ASSOCIATIONS

TiposUsuarios.hasOne(Usuarios, { foreignKey: "id_tipo" });
Usuarios.belongsTo(TiposUsuarios, { foreignKey: "id_tipo" });

Usuarios.belongsToMany(Turmas, {
  through: UsuariosTurmas,
  foreignKey: "usuarioId",
  as: "turmas",
});
Turmas.belongsToMany(Usuarios, {
  through: UsuariosTurmas,
  foreignKey: "turmaId",
  as: "usuarios",
});

Usuarios.hasMany(Mensagens, { foreignKey: "id_usuario" });
Mensagens.belongsTo(Usuarios, { foreignKey: "id_usuario" });

Conversas.hasMany(Mensagens, { foreignKey: "id_conversa" });
Mensagens.belongsTo(Conversas, { foreignKey: "id_conversa" });

// 👇 Associações com aliases para suportar Usuario1 e Usuario2
Conversas.belongsTo(Usuarios, { foreignKey: "usuario1_id", as: "Usuario1" });
Conversas.belongsTo(Usuarios, { foreignKey: "usuario2_id", as: "Usuario2" });

// EXPORTS

module.exports = {
  TiposUsuarios,
  Usuarios,
  Turmas,
  UsuariosTurmas,
  Conversas,
  Mensagens,
  database,
};
