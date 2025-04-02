const Sequelize = require("sequelize");
const database = require("../config/sequelize");
const { default_type } = require("mime");
const tipos_usuarios = require("./tipos_usuarios");
const turmas = require("./turmas");

const usuarios = database.define(
  "usuarios",
  {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cpf: {
      type: Sequelize.STRING,
      AllowNUll: false,
      unique: true,
    },
    nome: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    email: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    senha: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    id_tipo: {
      type: Sequelize.INTEGER,
      defaultValue: "1",
      AllowNUll: false,
      references: {
        model: tipos_usuarios,
        key: "id_tipo",
      },
    },
    telefone: {
      type: Sequelize.STRING,
      AllowNUll: false,
    },
    turmaId: {
        type: Sequelize.INTEGER,
        references: {
            model: turmas,
            key: "id",
        },
        allowNull: true,
    },
  },
  
  {
    timestamps: false, // Desativa createdAt e updatedAt
  }
);

tipos_usuarios.hasOne(usuarios, {
  foreignKey: "id_tipo",
});

usuarios.belongsTo(tipos_usuarios, {
  foreignKey: "id_tipo",
});

turmas.hasMany(usuarios, { foreignKey: "turmaId" });
usuarios.belongsTo(turmas, { foreignKey: "turmaId" });

module.exports = usuarios;
