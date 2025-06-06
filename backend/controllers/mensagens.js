const Mensagem = require("../models/mensagens");
const Usuario = require("../models/usuarios");

exports.enviarMensagem = async (req, res) => {
  const { id_conversa, id_usuario, id_destinatario, conteudo } = req.body;

  try {
    const mensagem = await Mensagem.create({
      id_conversa,
      id_usuario,
      id_destinatario,
      texto: conteudo,
    });

    // Busca a mensagem recém-criada com os dados do remetente e destinatário
    const mensagemCompleta = await Mensagem.findByPk(mensagem.id, {
      include: [
        { model: Usuario, as: "usuario", attributes: ["id", "nome", "imagem"] },
        { model: Usuario, as: "destinatario", attributes: ["id", "nome", "imagem"] },
      ],
    });

    res.status(201).json(mensagemCompleta);
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    res.status(500).json({ erro: "Erro ao enviar mensagem", detalhes: error.message });
  }
};

exports.buscarMensagensPorConversa = async (req, res) => {
  const { idConversa } = req.params;

  try {
    const mensagens = await Mensagem.findAll({
      where: { id_conversa: idConversa },
      include: [
        {
          model: Usuario,
          as: "usuario", // Inclui informações do remetente
          attributes: ["id", "nome", "imagem"],
        },
        {
          model: Usuario,
          as: "destinatario", // Inclui informações do destinatário
          attributes: ["id", "nome", "imagem"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.json(mensagens);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    res.status(500).json({ erro: "Erro ao buscar mensagens", detalhes: error.message });
  }
};