import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validate from '../middlewares/validate.js';
import { clienteCreateSchema, clienteUpdateSchema } from '../controllers/clienteController.js';

const router = express.Router();
//import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/', validate(clienteCreateSchema), clienteController.adicionarCliente);
//router.use(authMiddleware); // Aplica o middleware de autenticação para todas as rotas abaixo

router.get('/', clienteController.listarClientes);
router.put('/:cpf', validate(clienteUpdateSchema), clienteController.atualizarCliente);

router.delete('/:cpf', clienteController.deletarCliente);
export default router;
