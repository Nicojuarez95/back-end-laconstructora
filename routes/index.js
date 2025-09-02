import express from 'express';
import authRoutes from './auth.js';
import obrasRoutes from './obras.js';
import proveedoresRoutes from './proveedores.js';
import ingresosRoutes from './ingresos.js';
import gastosRoutes from './gastos.js';
import chequesRoutes from './cheques.js';
import balanceRoutes from './balances.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

// Rutas sin protección (para login)
router.use('/auth', authRoutes);

// Rutas protegidas
// Todas las rutas debajo de esta línea requerirán autenticación y autorización de 'admin'
router.use('/obras', authenticateToken, authorize(['admin']), obrasRoutes);
router.use('/proveedores', authenticateToken, authorize(['admin']), proveedoresRoutes);
router.use('/ingresos', authenticateToken, authorize(['admin']), ingresosRoutes);
router.use('/gastos', authenticateToken, authorize(['admin']), gastosRoutes);
router.use('/cheques', authenticateToken, authorize(['admin']), chequesRoutes);
router.use('/balance', authenticateToken, authorize(['admin']), balanceRoutes);

export default router;
