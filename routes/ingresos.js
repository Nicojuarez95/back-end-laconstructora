import express from 'express';
import ingresoController from '../controllers/ingresoController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.get('/', authenticateToken, authorize(['admin']), ingresoController.getIngresos);
router.post('/', authenticateToken, authorize(['admin']), ingresoController.createIngreso);
router.get('/:id', authenticateToken, authorize(['admin']), ingresoController.getIngresoById);
router.put('/:id', authenticateToken, authorize(['admin']), ingresoController.updateIngreso);
router.delete('/:id', authenticateToken, authorize(['admin']), ingresoController.deleteIngreso);

export default router;