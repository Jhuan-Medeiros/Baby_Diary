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
  id_destinatario: { // Certifique-se de que este campo está definido
    type: Sequelize.INTEGER,
    allowNull: true, // Pode ser `true` ou `false` dependendo da lógica
    references: {
      model: Usuario,
      key: "id",
    },
  },
}, {
  timestamps: true,
});

// Defina a associação com o modelo de Usuario
mensagens.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });
mensagens.belongsTo(Usuario, { foreignKey: "id_destinatario", as: "destinatario" });

module.exports = mensagens;

const Mensagem = require("../models/mensagens");

exports.buscarMensagensPorConversa = async (req, res) => {
  const { idConversa } = req.params;

  try {
    // Busca as mensagens com informações do remetente
    const mensagens = await Mensagem.findAll({
      where: { id_conversa: idConversa },
      include: [
        {
          model: Usuario,
          attributes: ["id", "nome", "imagem"], // Inclui informações do remetente
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    // Adiciona manualmente as informações do destinatário
    const mensagensComDestinatario = await Promise.all(
      mensagens.map(async (mensagem) => {
        const destinatario = await Usuario.findByPk(mensagem.id_destinatario, {
          attributes: ["id", "nome", "imagem"],
        });
        return { ...mensagem.toJSON(), destinatario };
      })
    );

    res.json(mensagensComDestinatario);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    res.status(500).json({ erro: "Erro ao buscar mensagens", detalhes: error.message });
  }
};