import Joi from 'joi'
import * as produtoService from '../services/produtoService.js'

export const produtoCreateSchema = Joi.object({
  nomeProduto: Joi.string().min(2).max(100).required(),
  descricao: Joi.string().max(255).required(),
  preco: Joi.number().positive().required(),
  categoria: Joi.string().max(50).required()
}).required()

export const produtoUpdateSchema = Joi.object({
  nomeProduto: Joi.string().min(2).max(100),
  descricao: Joi.string().max(255),
  preco: Joi.number().positive(),
  categoria: Joi.string().max(50)
}).min(1)

export const listarProdutos = async (req, res) => {

  try {

    const { idProduto, nomeProduto } = req.query

    const produtos = await produtoService.findAll(idProduto, nomeProduto)

    return res.status(200).json(produtos)

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao listar produtos.',
      erro: error.message
    })

  }

}

export const buscarProdutoPorId = async (req, res) => {

  try {

    const { idProduto } = req.params

    const produto = await produtoService.findAll(idProduto, null)

    if (!produto || produto.length === 0) {

      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      })

    }

    return res.status(200).json(produto[0])

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao buscar produto.',
      erro: error.message
    })

  }

}

export const criarProduto = async (req, res) => {

  try {

    const produto = await produtoService.create(req.body)

    return res.status(201).json({
      mensagem: 'Produto criado com sucesso.',
      produto
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao criar produto.',
      erro: error.message
    })

  }

}

export const atualizarProduto = async (req, res) => {

  try {

    const { idProduto } = req.params

    const produto = await produtoService.update(idProduto, req.body)

    return res.status(200).json({
      mensagem: 'Produto atualizado com sucesso.',
      produto
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao atualizar produto.',
      erro: error.message
    })

  }

}

export const deletarProduto = async (req, res) => {

  try {

    const { idProduto } = req.params

    await produtoService.remove(idProduto)

    return res.status(200).json({
      mensagem: 'Produto excluído com sucesso.'
    })

  } catch (error) {

    return res.status(500).json({
      mensagem: 'Erro ao excluir produto.',
      erro: error.message
    })

  }

}