import express from 'express';
import balanceController from '../controllers/balanceController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

let router = express.Router();

router.get('/general', authenticateToken, authorize(['admin']), balanceController.getGeneral);
router.get('/por-obra/:obraId', authenticateToken, authorize(['admin']), balanceController.getPorObra);
router.get('/mensual', authenticateToken, authorize(['admin']), balanceController.getMensual);
router.get('/semestral', authenticateToken, authorize(['admin']), balanceController.getSemestral);
router.get('/anual', authenticateToken, authorize(['admin']), balanceController.getAnual);

export default router;