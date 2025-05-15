const { Op } = require("sequelize");
const Rotina = require('../models/rotina');

exports.createRotina = async (req, res) => {
  try {
    const { aluno, alimentacao, evacuacao, observacoes } = req.body;

    const novaRotina = await Rotina.create({
      aluno,
      alimentacao,
      evacuacao,
      observacoes,
    });

    res.status(201).json(novaRotina);
  } catch (error) {
    console.error("Erro ao salvar rotina:", error);
    res.status(500).json({ error: 'Erro ao salvar rotina' });
  }
};
