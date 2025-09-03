import { Router } from 'express';
import chequeController from '../controllers/chequeController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas para cheques con autenticación y autorización de 'admin'
router.post('/', authenticateToken, authorize(['admin']), chequeController.create);
router.get('/', authenticateToken, authorize(['admin']), chequeController.getAll);
router.get('/:id', authenticateToken, authorize(['admin']), chequeController.getById);
router.put('/:id', authenticateToken, authorize(['admin']), chequeController.update);
router.delete('/:id', authenticateToken, authorize(['admin']), chequeController.delete);

export default router;