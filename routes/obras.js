import express from 'express';
import obraController from '../controllers/obraController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.get('/', authenticateToken, authorize(['admin']), obraController.getObras);
router.post('/', authenticateToken, authorize(['admin']), obraController.createObra);
router.get('/:id', authenticateToken, authorize(['admin']), obraController.getObraById);
router.put('/:id', authenticateToken, authorize(['admin']), obraController.updateObra);
router.delete('/:id', authenticateToken, authorize(['admin']), obraController.deleteObra);

export default router;