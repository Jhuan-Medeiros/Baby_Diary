const { Op, Sequelize } = require("sequelize");
const Conversa = require("../models/conversas");
const Usuario = require("../models/usuarios");
const Mensagem = require("../models/mensagens");

exports.criarConversa = async (req, res) => {
  const { usuario1_id, usuario2_id, titulo } = req.body;

  try {
    const conversaExistente = await Conversa.findOne({
      where: {
        [Op.or]: [
          { usuario1_id, usuario2_id },
          { usuario1_id: usuario2_id, usuario2_id: usuario1_id }
        ],
      },
    });

    if (conversaExistente) return res.status(200).json(conversaExistente);

    const conversa = await Conversa.create({ usuario1_id, usuario2_id, titulo });
    res.status(201).json(conversa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar conversa", detalhes: error.message });
  }
};

exports.getConversasDoUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const conversas = await Conversa.findAll({
      where: {
        [Op.or]: [{ usuario1_id: idUsuario }, { usuario2_id: idUsuario }],
      },
      include: [
        { model: Usuario, as: "Usuario1", attributes: ["id", "nome", "imagem"] },
        { model: Usuario, as: "Usuario2", attributes: ["id", "nome", "imagem"] },
      ],
    });

    res.json(conversas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar conversas", detalhes: error.message });
  }
};

exports.getConversaById = async (req, res) => {
  const { id } = req.params;

  try {
    const conversa = await Conversa.findByPk(id, {
      include: [
        { model: Usuario, as: "Usuario1", attributes: ["id", "nome", "imagem"] },
        { model: Usuario, as: "Usuario2", attributes: ["id", "nome", "imagem"] },
      ],
    });

    if (!conversa) return res.status(404).json({ erro: "Conversa não encontrada" });

    res.json(conversa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar conversa", detalhes: error.message });
  }
};

exports.listarConversasComUltimaMensagem = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const conversas = await Conversa.findAll({
      where: {
        [Op.or]: [{ usuario1_id: idUsuario }, { usuario2_id: idUsuario }],
      },
      include: [
        { model: Usuario, as: "Usuario1", attributes: ["id", "nome", "imagem"] },
        { model: Usuario, as: "Usuario2", attributes: ["id", "nome", "imagem"] },
      ],
    });

    // Buscar a última mensagem de cada conversa
    const resultado = await Promise.all(conversas.map(async (c) => {
      const outroUsuario = c.Usuario1.id == idUsuario
        ? { id: c.Usuario2.id, nome: c.Usuario2.nome, imagem: c.Usuario2.imagem }
        : { id: c.Usuario1.id, nome: c.Usuario1.nome, imagem: c.Usuario1.imagem };
      const ultimaMensagem = await Mensagem.findOne({
        where: {
          id_conversa: c.id,
          id_destinatario: idUsuario // só mensagens recebidas pelo usuário logado
        },
        order: [["createdAt", "DESC"]],
        include: [
          { model: Usuario, as: "Remetente", attributes: ["id", "nome", "imagem"] }
        ]
      });
      return {
        id: c.id,
        outroUsuario: { id: outroUsuario.id, nome: outroUsuario.nome },
        ultimaMensagem: ultimaMensagem
          ? {
              texto: ultimaMensagem.texto,
              data: ultimaMensagem.createdAt,
              remetente: ultimaMensagem.Remetente ? ultimaMensagem.Remetente.nome : null,
              Remetente: ultimaMensagem.Remetente || null
            }
          : null
      };
    }));

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar conversas com última mensagem", detalhes: error.message });
  }
};
