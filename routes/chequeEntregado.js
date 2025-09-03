import { Router } from 'express';
import chequeEntregadoController from '../controllers/chequeEntregadoController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas para cheques entregados con autenticación y autorización de 'admin'
router.post('/', authenticateToken, authorize(['admin']), chequeEntregadoController.create);
router.get('/', authenticateToken, authorize(['admin']), chequeEntregadoController.getAll);
router.get('/:id', authenticateToken, authorize(['admin']), chequeEntregadoController.getById);
router.put('/:id', authenticateToken, authorize(['admin']), chequeEntregadoController.update);
router.delete('/:id', authenticateToken, authorize(['admin']), chequeEntregadoController.delete);

export default router;
