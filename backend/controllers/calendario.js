const { Op } = require("sequelize");
const Calendario = require('../models/calendario');


exports.createCalendario = async (req, res) => {
    try {
        const novoEvento = await Calendario.create(req.body);
        return res.status(201).json(novoEvento);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar evento", error });
    }
};

exports.getCalendario = async (req, res) => {
    try{
        const dias = await Calendario.findAll()
        return res.status(200).send(dias);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.getCalendarioByDate = async (req, res) => {
    try {
      const { data } = req.params;
  
      const eventos = await Calendario.findAll({
        where: { data: data },
        order: [['horario', 'ASC']],
      });
  
      return res.status(200).json(eventos);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar eventos", error: err.message });
    }
  };

  //NEW

  exports.deleteCalendarioById = async (req, res) => {
    try {
        const { id_calendario } = req.params;
        const evento = await Calendario.findByPk(id_calendario);

        if (!evento) {
            return res.status(404).json({ message: "Evento não encontrado" });
        }

        await evento.destroy();
        return res.status(200).json({ message: "Evento deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar evento", error });
    }
};

// exports.updateCalendarioById = async (req, res) => {
//   try {
//     const { id_calendario } = req.params;
//     const evento = await Calendario.findByPk(id_calendario);

//     if (!evento) {
//       return res.status(404).json({ message: "Evento não encontrado" });
//     }

//     await evento.update(req.body);
//     return res.status(200).json({ message: "Evento atualizado com sucesso", evento });
//   } catch (error) {
//     return res.status(500).json({ message: "Erro ao atualizar evento", error });
//   }
// };
