const Mensagem = require("../models/mensagens");
const Usuario = require("../models/usuarios");

exports.enviarMensagem = async (req, res) => {
  const { id_conversa, id_usuario, conteudo } = req.body;

  try {
    // Alterando o nome do campo para 'texto' ao criar a mensagem
    const mensagem = await Mensagem.create({
      id_conversa,
      id_usuario,
      texto: conteudo,  // 'conteudo' será mapeado para o campo 'texto' na tabela
    });

    res.status(201).json(mensagem);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao enviar mensagem", detalhes: error.message });
  }
};

exports.buscarMensagensPorConversa = async (req, res) => {
  const { idConversa } = req.params;

  try {
    const mensagens = await Mensagem.findAll({
      where: { id_conversa: idConversa },
      include: {
        model: Usuario,
        attributes: ["id", "nome"],
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar mensagens", detalhes: error.message });
  }
};
