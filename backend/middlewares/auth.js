const jwt = require("jsonwebtoken");
require("dotenv").config();

const chave = process.env.CHAVE_JWT;
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }
    const [, token] = authHeader.split(" ");
    try{
        const decoded = jwt.verify(token, chave);
        req.usuario = decoded
        next();
    } catch (err) {
        return res.status(401).json({ mensagem: "Token inválido." });
    }
}