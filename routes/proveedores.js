import { Router } from 'express';
import proveedorController from '../controllers/proveedorController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas para proveedores con autenticación y autorización de 'admin'
router.post('/', authenticateToken, authorize(['admin']), proveedorController.create);
router.get('/', authenticateToken, authorize(['admin']), proveedorController.getAll);
router.get('/:id', authenticateToken, authorize(['admin']), proveedorController.getById);
router.put('/:id', authenticateToken, authorize(['admin']), proveedorController.update);
router.delete('/:id', authenticateToken, authorize(['admin']), proveedorController.delete);

export default router;