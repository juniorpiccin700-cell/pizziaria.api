import express from 'express';

import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';

// import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.use(authMiddleware);

router.get('/', produtoController.listarProdutos);
router.get('/:idProduto', produtoController.buscarProdutoPorId);
router.post('/', validate(produtoController.produtoCreateSchema), produtoController.criarProduto);
router.put('/:idProduto', validate(produtoController.produtoUpdateSchema), produtoController.atualizarProduto);
router.delete('/:idProduto', produtoController.deletarProduto);

export default router;