const jwt = require("jsonwebtoken");
require('dotenv').config();
const chave = process.env.CHAVE_JWT;

function verificarTipoUsuario(tiposPermitidos){
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ mensagem: "Token não fornecido." });
        }

        const authToken = authHeader.split(" ")[1];

        try{
            const decoded = jwt.verify(authToken, chave);

            if (!tiposPermitidos.includes(decoded.tipo)) {
                return res.status(403).json({ mensagem: "Acesso negado." });
            }
            req.usuario = decoded;
            next();
        }catch (err){
            return res.status(401).json({ mensagem: "Token inválido." });
        }
    };
}

module.exports = verificarTipoUsuario;