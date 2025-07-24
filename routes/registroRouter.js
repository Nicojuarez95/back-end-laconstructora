import express from 'express';
import controller from '../controllers/registroController.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js'; // Necesitamos el middleware de autorización

// Asegúrate de importar la nueva función
const { createRegistro, getMyRegistros, updateRegistro, deleteRegistro, getTeamRegistros } = controller;

const router = express.Router();

// Todas las rutas de registros requieren que el usuario esté autenticado.
router.use(authenticateToken);

// --- NUEVA RUTA PARA SUPERVISORES ---
// Esta debe ir antes de las rutas generales para que no haya conflictos.
router.get('/team', authorize('supervisor'), getTeamRegistros);


// --- RUTAS GENERALES PARA "MIS REGISTROS" ---
router.get('/', getMyRegistros);
router.post('/', createRegistro);
router.put('/:id', updateRegistro);
router.delete('/:id', deleteRegistro);

export default router;
