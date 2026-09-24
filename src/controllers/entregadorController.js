import * as entregadorServices from '../services/entregadorServices.js';


import Joi from 'joi';

export const entregadorCreateSchema = Joi.object({
    idEntregador: Joi.string().required(),
    nomeEntregador: Joi.string().required(),
    telefone: Joi.string().required(),
})

export const entregadorUpdateSchema = Joi.object({
  idEntregador: Joi.string(),
  nomeEntregador: Joi.string().max(100),
  telefone: Joi.number(),
})

export const listarEntregadores = async (req, res) => {

  try {

    const { idEntregador, nomeEntregador } = req.query

    const entregadores = await entregadorServices.findAll(
      idEntregador,
      nomeEntregador
    )

    return res.status(200).json(entregadores)

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao listar entregadores.',
      erro: error.message
    })

  }

}

export const buscarEntregadorPorId = async (req, res) => {

  try {

    const { idEntregador } = req.params

    const entregador = await entregadorServices.findAll(idEntregador, null)

    if (!entregador || entregador.length === 0) {

      return res.status(404).json({
        mensagem: 'Entregador não encontrado.'
      })

    }

    return res.status(200).json(entregador[0])

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao buscar entregador.',
      erro: error.message
    })

  }

}

export const criarEntregador = async (req, res) => {

  try {

    const entregador = await entregadorServices.create(req.body)

    return res.status(201).json({
      mensagem: 'Entregador criado com sucesso.',
      entregador
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao criar entregador.',
      erro: error.message
    })

  }

}

export const atualizarEntregador = async (req, res) => {

  try {

    const { idEntregador } = req.params

    const entregador = await entregadorServices.update(
      idEntregador,
      req.body
    )

    return res.status(200).json({
      mensagem: 'Entregador atualizado com sucesso.',
      entregador
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao atualizar entregador.',
      erro: error.message
    })

  }

}

export const deletarEntregador = async (req, res) => {

  try {

    const { idEntregador } = req.params

    await entregadorServices.remove(idEntregador)

    return res.status(200).json({
      mensagem: 'Entregador excluído com sucesso.'
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao excluir entregador.',
      erro: error.message
    })

  }

}