import { Router } from 'express';
import ingresoController from '../controllers/ingresoController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas para ingresos con autenticación y autorización de 'admin'
router.post('/', authenticateToken, authorize(['admin']), ingresoController.createIngreso);
router.post('/from-cheque', authenticateToken, authorize(['admin']), ingresoController.createIngresoFromCheque);
router.get('/', authenticateToken, authorize(['admin']), ingresoController.getIngresos);
router.get('/:id', authenticateToken, authorize(['admin']), ingresoController.getIngresoById);
router.put('/:id', authenticateToken, authorize(['admin']), ingresoController.updateIngreso);
router.delete('/:id', authenticateToken, authorize(['admin']), ingresoController.deleteIngreso);

export default router;

