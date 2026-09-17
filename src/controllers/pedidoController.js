import * as pedidoService from '../services/pedidoService.js';

export const listarPedidos = async (req, res) => {
  try {

    const { idPedido, cpf } = req.query;
    const pedidos = await pedidoService.findAll(idPedido, cpf);
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao listar pedidos.',
      erro: error.message
    });
  }
};

export const buscarPedidoPorCpf = async (req, res) => {
  try {
    const { cpf } = req.params;
    const pedido = await pedidoService.findAll(null, cpf);

    if (!pedido || pedido.length === 0) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
    }

    return res.status(200).json(pedido[0]);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao buscar pedido.',
      erro: error.message
    });
  }
};

export const criarPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.create(req.body);

    return res.status(201).json({
      mensagem: 'Pedido criado com sucesso.',
      pedido
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: error.message || 'Erro ao criar pedido.',
      erro: error.message
    });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoAtualizado = await pedidoService.update(id, req.body);

    if (!pedidoAtualizado) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
    }

    return res.status(200).json({
      mensagem: 'Pedido atualizado com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao atualizar pedido.',
      erro: error.message
    });
  }
};

export const deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoDeletado = await pedidoService.remove(id);

    if (!pedidoDeletado) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
    }

    return res.status(200).json({
      mensagem: 'Pedido removido com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao remover pedido.',
      erro: error.message
    });
  }
};