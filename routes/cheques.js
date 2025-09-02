import express from 'express';
import chequeController from '../controllers/chequeController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.get('/', authenticateToken, authorize(['admin']), chequeController.getCheques);
router.post('/', authenticateToken, authorize(['admin']), chequeController.createCheque);
router.get('/:id', authenticateToken, authorize(['admin']), chequeController.getChequeById);
router.put('/:id', authenticateToken, authorize(['admin']), chequeController.updateCheque);
router.delete('/:id', authenticateToken, authorize(['admin']), chequeController.deleteCheque);

export default router;