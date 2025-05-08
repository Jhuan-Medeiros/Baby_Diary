const { Op } = require("sequelize"); // faltando no seu código!
const Conversa = require("../models/conversas");
const Usuario = require("../models/usuarios");

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
        { model: Usuario, as: "Usuario1", attributes: ["id", "nome"] },
        { model: Usuario, as: "Usuario2", attributes: ["id", "nome"] },
      ],
    });

    res.json(conversas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar conversas", detalhes: error.message });
  }
};