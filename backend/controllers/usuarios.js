const { Op } = require("sequelize");
const Usuarios = require("../models/usuarios");
const tipos_usuarios = require("../models/tipos_usuarios");
const bcrypt = require("bcrypt");
const chave = require("../segredos/chave.js");

exports.createUsuario = async (req, res) => {
  try {
    const { cpf, nome, email, senha, telefone, id_tipo } = req.body;
    const verificacao = await Usuarios.findOne({ where: { cpf } });

    const usuarioExistente = await Usuarios.findOne({
      where: { [Op.or]: [{ cpf }, { email }] },
    });

    if (usuarioExistente) {
      return res.status(409).json({ message: "Usuário já existe" });
    }

    if (verificacao) {
      return res.send("usuario ja foi cadastrado");
    }
    console.log(senha);
    const senhaNova = await bcrypt.hash(senha, 10);
    console.log(senhaNova, senha);
    const usuarioCriado = await Usuarios.create({
      cpf,
      nome,
      email,
      senha: senhaNova,
      telefone,
      id_tipo,
    });
    console.log(usuarioCriado);
    return res.send("usuario cadastrado com sucesso");
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const jwt = require("jsonwebtoken");

  try {
    const { cpf, senha } = req.body;

    const usuario = await Usuarios.findOne({
      where: { cpf },
      include: tipos_usuarios,
    });

    if (!usuario) {
      return res
        .status(404)
        .send({ sucesso: false, mensagem: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res
        .status(401)
        .send({ sucesso: false, mensagem: "Senha incorreta" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        cpf: usuario.cpf,
        tipo: usuario.id_tipo,
      },
      chave,
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      sucesso: true,
      token,
      usuario: {
        id: usuario.id,
        cpf: usuario.cpf,
        nome: usuario.nome,
        tipo: usuario.id_tipo,
        nome_tipo: usuario.tipos_usuarios?.nome
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res
      .status(500)
      .send({ sucesso: false, mensagem: "Erro interno do servidor" });
  }
};


exports.getUsersByCpf = async (req, res) => {
  try {
    const encontrarUsuario = await Usuarios.findByPk(req.params.cpf, {
      include: tipos_usuarios,
    });
    if (!encontrarUsuario) {
      return res.status(404).send("Usuario not found");
    }

    return res.send(encontrarUsuario);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
exports.deleteUsuario = async (req, res) => {
  try {
    const encontrarUsuario = await Usuarios.findOne({
      where: { cpf: req.params.cpf },
    });
    await encontrarUsuario.destroy();
    return res.send("usuario deletado");
  } catch (err) {
    return res.send("aqui deu erro mn se liga", err);
  }
};

exports.updateUsuario = async (req, res) => {
  const Cpf = req.params.cpf;
  const CpfUsuario = await Usuarios.findOne({ where: { cpf: Cpf } });

  if (CpfUsuario) {
    try {
      const [Updates] = await Usuarios.update(req.body, {
        where: { cpf: req.params.cpf },
      });
      return res.send({ message: "Usuario foi atualizado ;P" });
    } catch (error) {
      return res.send("deu erro aqui meu mano ==> ", error);
    }
  }
  return res.send("usuario not found!!!");
};

exports.getAllUsers = async (req, res) => {
  try {
    const encontrarUsuario = await Usuarios.findAll({
      include: { model: tipos_usuarios },
    });
    return res.send(encontrarUsuario);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
