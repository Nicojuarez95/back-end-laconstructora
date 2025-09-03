import { Router } from 'express';
import obraController from '../controllers/obraController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas para obras con autenticación y autorización de 'admin'
router.post('/', authenticateToken, authorize(['admin']), obraController.create);
router.get('/', authenticateToken, authorize(['admin']), obraController.getAll);
router.get('/:id', authenticateToken, authorize(['admin']), obraController.getById);
router.put('/:id', authenticateToken, authorize(['admin']), obraController.update);
router.delete('/:id', authenticateToken, authorize(['admin']), obraController.delete);

export default router;