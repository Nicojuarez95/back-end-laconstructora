import express from 'express';
import gastoController from '../controllers/gastoController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.get('/', authenticateToken, authorize(['admin']), gastoController.getGastos);
router.post('/', authenticateToken, authorize(['admin']), gastoController.createGasto);
router.get('/:id', authenticateToken, authorize(['admin']), gastoController.getGastoById);
router.put('/:id', authenticateToken, authorize(['admin']), gastoController.updateGasto);
router.delete('/:id', authenticateToken, authorize(['admin']), gastoController.deleteGasto);

export default router;