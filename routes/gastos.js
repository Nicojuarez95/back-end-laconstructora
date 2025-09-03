import { Router } from 'express';
import gastoController from '../controllers/gastoController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas para gastos con autenticación y autorización de 'admin'
router.post('/', authenticateToken, authorize(['admin']), gastoController.create);
router.get('/', authenticateToken, authorize(['admin']), gastoController.getAll);
router.get('/:id', authenticateToken, authorize(['admin']), gastoController.getById);
router.put('/:id', authenticateToken, authorize(['admin']), gastoController.update);
router.delete('/:id', authenticateToken, authorize(['admin']), gastoController.delete);

export default router;
