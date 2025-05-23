const { Op } = require("sequelize");
const TiposUsuarios = require("../models/tipos_usuarios");
const tipos_usuarios = require("../models/tipos_usuarios");

exports.createTiposUsuarios = async (req, res) => {
  try {
    const verificacao = await TiposUsuarios.findByPk(req.params.nivel);
    if (verificacao) {
      return res.send("Tipo de usuario ja foi cadastrado");
    }
    const Tipo = await TiposUsuarios.create(req.body);

    return res.send("tipo de usuario cadastrado com sucesso");
  } catch (err) {
    return res.status(403).send("erro: " + err);
  }
};

exports.getTiposUsuarios = async (req, res) => {
  try {
    const { id_tipo, nivel } = req.query || {};

    if (!id_tipo && !nivel) {
      const user = await tipos_usuarios.findAll();
      return res.send(user);
    }

    const pesquisa = {
      [Op.or]: [
        id_tipo ? { id_tipo: { [Op.like]: `%${id_tipo}%` } } : undefined,
        nivel ? { nivel: { [Op.like]: `%${nivel}%` } } : undefined,
      ].filter(Boolean),
    };

    const users = await tipos_usuarios.findAll({ where: pesquisa });

    return res.send(users);
  } catch (err) {
    return res.status(403).send("error");
  }
};

exports.deleteTiposUsuarios = async (req, res) => {
  try {
    const encontrarTipo = await tipos_usuarios.findOne({
      where: { id_tipo: req.params.id_tipo },
    });
    await encontrarTipo.destroy();
    return res.send("tipo de usuario deletado");
  } catch (error) {
    return res.send("erroa", err);
  }
};