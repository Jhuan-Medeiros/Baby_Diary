const Sequelize = require("sequelize");
const database = require("../config/sequelize");
const Usuario = require("./usuarios"); // Certifique-se de que o caminho está correto
const Conversa = require("./conversas"); // Certifique-se de que o caminho está correto

const mensagens = database.define("mensagens", {
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
      model: Usuario,  // Garantindo que o modelo de Usuario está sendo referenciado corretamente
      key: "id",
    },
  },
  id_conversa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Conversa,  // Garantindo que o modelo de Conversa está sendo referenciado corretamente
      key: "id",
    },
  },
}, {
  timestamps: true,
});

// Defina a associação com o modelo de Usuario
mensagens.belongsTo(Usuario, { foreignKey: "id_usuario" });
mensagens.belongsTo(Usuario, { foreignKey: "id_destinatario", as: "destinatario" });

module.exports = mensagens;