import * as clienteService from '../services/clienteServices.js';
import Joi from 'joi' ;

export const clienteCreateSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required().max(100),
    endereco: Joi.string().max(100).required(),
    bairro:Joi.string().max(30).required(),
    cidade:Joi.string().max(30).required(),
    cep:Joi.string().max(8).required(),
    telefone:Joi.string().required(),
    email:Joi.string().email().max(50).required(),
    senha:Joi.string().min(6).max(100).required(),
    tipo:Joi.string().max(10).required(),
});

export const clienteUpdateSchema = Joi.object({
    nome:Joi.string().max(100),
    endereco:Joi.string().max(100),
    bairro:Joi.string().max(30),
    cidade:Joi.string().max(30),
    cep:Joi.string().max(8),
    telefone:Joi.string(),
    email:Joi.string().email().max(50),
    senha:Joi.string().min(6),
    
}).min(1);

export const listarClientes = async (req , res) =>{
    try{
        const{cpf , nome , email} = req.query;

        const cliente = await clienteService.findAll(cpf, nome, email);

        res.json(cliente);
    } catch (err) {
        console.error('Erro ao buscar ususario:', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
    };

    export const adicionarCliente = async (req, res) => {
        try {
            const novoCliente =  await clienteService.create(req.body);
            res.status(201).json({message: 'Cliente adicionado com sucesso', data:novoCliente} );
        } catch (err) {
            console.error('Erro ao adicionar cliente:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).json({error: 'CPF já cadastrado'});
            } else {
                res.status(500).json({error: 'Erro ao adicionar cliente'});
            }
        };
    }
        export const atualizarCliente = async (req, res) => {
            try {
                const { cpf } = req.params;
                const updated = await clienteService.update(cpf, req.body);
                if (!updated) {
                    return res.status(404).json({error: 'Cliente não encontrado'});
                }
                res.status(200).json({message: 'Cliente atualizado com sucesso'});
            } catch (err) {
                console.error('Erro ao atualizar cliente:', err);
                res.status(500).json({error: 'Erro ao atualizar cliente'});
            }
        };
        export const deletarCliente = async (req, res) => {
            try {
                const { cpf } = req.params;
                const deleted = await clienteService.remove(cpf);
                if (!deleted) {
                    return res.status(404).json({error: 'Cliente não encontrado'});
                }
                res.status(200).json({message: 'Cliente deletado com sucesso'});
            } catch (err) {
                console.error('Erro ao deletar cliente:', err);
                res.status(500).json({error: 'Erro ao deletar cliente'});
            }
        };