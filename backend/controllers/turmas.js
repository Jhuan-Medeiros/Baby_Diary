const Turmas = require("../models/turmas");

exports.createTurma = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome da turma é obrigatório." });
    }

    // Verificar se já existe uma turma com esse nome
    const turmaExistente = await Turmas.findOne({ where: { nome } });

    if (turmaExistente) {
      return res.status(409).json({ mensagem: "Já existe uma turma com esse nome." });
    }

    const novaTurma = await Turmas.create({ nome });

    return res.status(201).json({
      mensagem: "Turma criada com sucesso!",
      turma: novaTurma,
    });
  } catch (erro) {
    console.error("Erro ao criar turma:", erro); // Aqui ele já mostra o erro real
    return res.status(500).json({ mensagem: "Erro interno ao criar turma.", erro: erro.message });
  }
};

exports.getAllTurmas = async (req, res) => {
    try{
        const encontrarTurmas = await Turmas.findAll();
        return res.send(encontrarTurmas);
    } catch (err) {
        return res.status(500).send("Erro ao buscar turmas: " + err);
    }
}