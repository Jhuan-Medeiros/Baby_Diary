const Sequelize = require("sequelize");
const database = require("../config/sequelize");
const Usuario = require("./usuarios"); // Certifique-se de que este é o caminho correto

const Conversa = database.define(
  "conversas",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    usuario1_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,  // Relacionamento com o modelo Usuario
        key: "id",
      },
    },
    usuario2_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,  // Relacionamento com o modelo Usuario
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);


// Associações
Conversa.belongsTo(Usuario, { foreignKey: "usuario1_id", as: "Usuario1" });
Conversa.belongsTo(Usuario, { foreignKey: "usuario2_id", as: "Usuario2" });

module.exports = Conversa;