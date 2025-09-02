import express from 'express';
import authRoutes from './auth.js';
import obrasRoutes from './obras.js';
import proveedoresRoutes from './proveedores.js';
import ingresosRoutes from './ingresos.js';
import gastosRoutes from './gastos.js';
import chequesRoutes from './cheques.js';
import balancesRoutes from './balances.js';

let router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);
// Rutas de la aplicación (protegidas)
router.use('/obras', obrasRoutes);
router.use('/proveedores', proveedoresRoutes);
router.use('/ingresos', ingresosRoutes);
router.use('/gastos', gastosRoutes);
router.use('/cheques', chequesRoutes);
router.use('/balances', balancesRoutes);

export default router;