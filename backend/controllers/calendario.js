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

exports.deleteCalendario = async (req, res) => {
    try {

        const encontarCaledario = await Calendario.findOne({
          where: { id_calendario: req.params.id_calendario },
        });
    
        await encontarCaledario.destroy();
        return res.send("Evento deletado");
        
      } catch (err) {
        return res.send("Erro ao deletar evento", err);
      }
}