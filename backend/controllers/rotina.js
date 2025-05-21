const { Op } = require("sequelize");
const Rotina = require("../models/rotina");
const Usuario = require("../models/usuarios");
const Conversa = require("../models/conversas");
const Mensagem = require("../models/mensagens");

// Criar uma nova rotina e notificar via mensagem
exports.createRotina = async (req, res) => {
  try {
    const { aluno, alimentacao, evacuacao, observacoes, remetenteId } = req.body;

    const alunoExiste = await Usuario.findOne({ where: { id: aluno } });
    if (!alunoExiste) {
      return res.status(400).json({ error: "Aluno não encontrado." });
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Verifica se já existe rotina para esse aluno hoje
    let rotina = await Rotina.findOne({
      where: {
        aluno,
        createdAt: {
          [Op.gte]: hoje,
        },
      },
    });

    if (rotina) {
      // Atualiza a rotina existente
      rotina.alimentacao = alimentacao;
      rotina.evacuacao = evacuacao;
      rotina.observacoes = observacoes;
      await rotina.save();
    } else {
      // Cria nova rotina
      rotina = await Rotina.create({
        aluno,
        alimentacao,
        evacuacao,
        observacoes,
      });
    }

    // Conversa e mensagem (mantém igual)
    let conversa = await Conversa.findOne({
      where: {
        [Op.or]: [
          { usuario1_id: remetenteId, usuario2_id: alunoExiste.id },
          { usuario1_id: alunoExiste.id, usuario2_id: remetenteId },
        ],
      },
    });
    if (!conversa) {
      conversa = await Conversa.create({
        usuario1_id: remetenteId,
        usuario2_id: alunoExiste.id,
        titulo: `Chat com ${alunoExiste.nome}`,
      });
    }

    const textoRotina = `
Rotina de ${alunoExiste.nome}:
Alimentação: ${Object.entries(alimentacao).map(([ref, val]) => `${ref}: ${val}`).join(", ")}
Evacuação: ${evacuacao}
Observações: ${observacoes || "Nenhuma"}
    `.trim();

    await Mensagem.create({
      id_conversa: conversa.id,
      id_usuario: remetenteId,
      id_destinatario: alunoExiste.id,
      texto: textoRotina,
    });

    res.status(201).json(rotina);
  } catch (error) {
    console.error("Erro ao salvar rotina:", error);
    res.status(500).json({ error: 'Erro ao salvar rotina' });
  }
};

// Buscar rotina por aluno (GET /rotina/:id)
exports.getRotinaById = async (req, res) => {
  try {
    const alunoId = req.params.id;

    const rotina = await Rotina.findOne({ where: { aluno: alunoId } });

    if (!rotina) {
      return res.status(404).json({ error: "Rotina não encontrada." });
    }

    res.status(200).json(rotina);
  } catch (error) {
    console.error("Erro ao buscar rotina:", error);
    res.status(500).json({ error: 'Erro ao buscar rotina' });
  }
};

// Atualizar rotina de um aluno (opcional)
exports.updateRotina = async (req, res) => {
  try {
    const alunoId = req.params.id;
    const { alimentacao, evacuacao, observacoes } = req.body;

    const rotina = await Rotina.findOne({ where: { aluno: alunoId } });

    if (!rotina) {
      return res.status(404).json({ error: "Rotina não encontrada." });
    }

    rotina.alimentacao = alimentacao;
    rotina.evacuacao = evacuacao;
    rotina.observacoes = observacoes;

    await rotina.save();

    res.status(200).json(rotina);
  } catch (error) {
    console.error("Erro ao atualizar rotina:", error);
    res.status(500).json({ error: 'Erro ao atualizar rotina' });
  }
};

