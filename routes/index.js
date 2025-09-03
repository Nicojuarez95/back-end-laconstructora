import { Router } from 'express';
import authRoutes from './auth.js';
import obrasRoutes from './obras.js';
import proveedoresRoutes from './proveedores.js';
import ingresosRoutes from './ingresos.js';
import gastosRoutes from './gastos.js';
import chequesRoutes from './cheques.js';
import chequeEntregadoRoutes from './chequeEntregado.js'; // Nueva ruta
import balanceRoutes from './balances.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// Rutas sin protección (para login)
router.use('/auth', authRoutes);

// Rutas protegidas
router.use('/obras', authenticateToken, authorize(['admin']), obrasRoutes);
router.use('/proveedores', authenticateToken, authorize(['admin']), proveedoresRoutes);
router.use('/ingresos', authenticateToken, authorize(['admin']), ingresosRoutes);
router.use('/gastos', authenticateToken, authorize(['admin']), gastosRoutes);
router.use('/cheques', authenticateToken, authorize(['admin']), chequesRoutes);
router.use('/chequesEntregados', authenticateToken, authorize(['admin']), chequeEntregadoRoutes); // Nueva ruta para cheques entregados
router.use('/balance', authenticateToken, authorize(['admin']), balanceRoutes);

export default router;