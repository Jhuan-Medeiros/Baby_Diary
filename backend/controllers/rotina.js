const { Op } = require("sequelize");
const Rotina = require('../models/rotina');
const Usuario = require('../models/usuarios'); // ou Aluno, conforme seu projeto

exports.createRotina = async (req, res) => {
  try {
    const { aluno, alimentacao, evacuacao, observacoes } = req.body;

    // Verifica se o aluno existe
    const alunoExiste = await Usuario.findOne({ where: { nome: aluno } });
    if (!alunoExiste) {
      return res.status(400).json({ error: "Aluno não encontrado." });
    }

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