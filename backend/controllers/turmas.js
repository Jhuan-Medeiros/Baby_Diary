const Turmas = require("../models/turmas");
const Usuarios = require("../models/usuarios");
const UsuariosTurmas = require("../models/usuarios_turmas");

exports.createTurma = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome da turma é obrigatório." });
    }

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
    console.error("Erro ao criar turma:", erro);
    return res.status(500).json({ mensagem: "Erro interno ao criar turma.", erro: erro.message });
  }
};

// Listar todas as turmas (sem alunos)
exports.getAllTurmas = async (req, res) => {
  try {
    const turmas = await Turmas.findAll();
    return res.json(turmas);
  } catch (err) {
    console.error("Erro ao buscar turmas:", err);
    return res.status(500).json({ mensagem: "Erro ao buscar turmas." });
  }
};

// Buscar turma por ID com alunos
exports.getTurmaById = async (req, res) => {
  const { id } = req.params;
  try {
    const turma = await Turmas.findByPk(id, {
      include: [{ model: Usuarios, as: "alunos" }],
    });

    if (!turma) {
      return res.status(404).json({ erro: "Turma não encontrada" });
    }

    return res.json(turma);
  } catch (err) {
    console.error("Erro ao buscar turma por ID:", err);
    return res.status(500).json({ erro: "Erro ao buscar turma" });
  }
};

// Deletar turma
exports.deleteTurma = async (req, res) => {
  const { id } = req.params;
  try {
    const turma = await Turmas.findByPk(id);
    if (!turma) {
      return res.status(404).json({ mensagem: "Turma não encontrada" });
    }

    await turma.destroy();
    return res.status(200).json({ mensagem: "Turma excluída com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir turma:", err);
    return res.status(500).json({ mensagem: "Erro ao excluir a turma" });
  }
};

// Adicionar usuário à turma
exports.adicionarUsuarioNaTurma = async (req, res) => {
  const { id } = req.params; // id da turma
  const { usuarioId } = req.body;
  console.log(usuarioId, id);

  try {
    const turma = await Turmas.findByPk(id);
    const usuario = await Usuarios.findByPk(usuarioId);

    if (!turma || !usuario) {
      return res.status(404).json({ mensagem: "Turma ou usuário não encontrado." });
    }

    // Verifica se já está na turma
    const jaExiste = await UsuariosTurmas.findOne({
      where: {
        usuarioId,
        turmaId: id,
      },
    });

    if (jaExiste) {
      return res.status(409).json({ mensagem: "Usuário já está nessa turma." });
    }

    // Adiciona via associação do Sequelize
    await turma.addAluno(usuario);

    return res.status(200).json({ mensagem: "Usuário adicionado à turma com sucesso!" });
  } catch (err) {
    console.error("Erro ao adicionar usuário na turma:", err);
    return res.status(500).json({ mensagem: "Erro ao adicionar usuário na turma.", err });
  }
};

exports.removerUsuarioDaTurma = async (req, res) => {
  const { id } = req.params;
  const { usuarioId } = req.body;
  try {
    const turma = await Turmas.findByPk(id);
    const usuario = await Usuarios.findByPk(usuarioId);

    if (!turma || !usuario) {
      return res.status(404).json({ mensagem: "Turma ou usuário não encontrado." });
    }

    // Verifica se o usuário está na turma
    const usuarioNaTurma = await UsuariosTurmas.findOne({
      where: {
        usuarioId,
        turmaId: id,
      },
    });

    if (!usuarioNaTurma) {
      return res.status(404).json({ mensagem: "Usuário não encontrado nessa turma." });
    }

    // Remove via associação do Sequelize
    await turma.removeAluno(usuario);

    return res.status(200).json({ mensagem: "Usuário removido da turma com sucesso!" });
  } catch (err) {
    console.error("Erro ao remover usuário da turma:", err);
    return res.status(500).json({ mensagem: "Erro ao remover usuário da turma.", err });
  }
}
