import express from 'express';
import proveedorController from '../controllers/proveedorController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.get('/', authenticateToken, authorize(['admin']), proveedorController.getProveedores);
router.post('/', authenticateToken, authorize(['admin']), proveedorController.createProveedor);
router.get('/:id', authenticateToken, authorize(['admin']), proveedorController.getProveedorById);
router.put('/:id', authenticateToken, authorize(['admin']), proveedorController.updateProveedor);
router.delete('/:id', authenticateToken, authorize(['admin']), proveedorController.deleteProveedor);

export default router;