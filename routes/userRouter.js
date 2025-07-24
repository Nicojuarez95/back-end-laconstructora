import express from 'express';
import controller from '../controllers/userControllers.js';
import authenticateToken from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

// Asegúrate de importar las nuevas funciones
const { 
    register, 
    sign_in, 
    getAllUsers, 
    getUserProfile, 
    updateUserRole, 
    deleteUser,
    assignSupervisor,
    getAssignedUsers
} = controller;

const router = express.Router();

// --- RUTAS PÚBLICAS ---
router.post('/register', register);
router.post('/sign-in', sign_in);

// --- RUTAS PROTEGIDAS ---
router.use(authenticateToken);

// --- NUEVA RUTA PARA SUPERVISORES ---
// Esta ruta debe ir ANTES de las rutas con :id para que no confunda "me" con un ID.
router.get('/me/assigned', authorize('supervisor'), getAssignedUsers);


// --- RUTAS DE ADMINISTRACIÓN ---
router.get('/', authorize('administrador'), getAllUsers);
router.get('/:id', getUserProfile);
router.put('/:id/role', authorize('administrador'), updateUserRole);
router.delete('/:id', authorize('administrador'), deleteUser);

// --- NUEVA RUTA PARA ASIGNAR SUPERVISOR ---
router.put('/:id/assign-supervisor', authorize('administrador'), assignSupervisor);


export default router;
