import express from 'express';

import * as entregadorController from '../controllers/entregadorController.js';

import { entregadorCreateSchema, entregadorUpdateSchema } from '../controllers/entregadorController.js';
import validate from '../middlewares/validate.js';

const router = express.Router()

router.post('/', validate(entregadorCreateSchema), entregadorController.criarEntregador);

router.get('/', entregadorController.buscarEntregadorPorId)

router.put('/:idEntregador', validate(entregadorUpdateSchema), entregadorController.atualizarEntregador)

router.delete('/:idEntregador', entregadorController.deletarEntregador);

export default router;


