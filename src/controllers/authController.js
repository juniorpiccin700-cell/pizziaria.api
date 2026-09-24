// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as clienteServices from '../services/clienteServices.js';
export const login = async (req, res) => {
const { cpf, senha } = req.body;
try {
    const clientes = await clienteServices.findAll(cpf);
    const cliente = clientes[0];
    if (!cliente )
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    const senhaValida = await bcrypt.compare(senha, cliente[0].senha);
    if (!senhaValida)
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    const payload = {cpf: cliente.cpf, email: cliente.email};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ mensagem: 'Login realizado com sucesso.', token: token });}
    catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}