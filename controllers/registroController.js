import Registro from '../models/registroSchema.js';
import User from '../models/userSchema.js'; // <-- ESTA LÍNEA ES LA QUE FALTA

const controller = {
    // Crear un nuevo registro
    createRegistro: async (req, res, next) => {
        try {
            const { tipo, contenido } = req.body;
            // El ID del usuario que crea el registro viene del token de autenticación (req.user)
            const userId = req.user.id;

            const nuevoRegistro = await Registro.create({
                userId,
                tipo,
                contenido
            });

            res.status(201).json({ success: true, message: 'Registro creado exitosamente.', registro: nuevoRegistro });
        } catch (error) {
            next(error);
        }
    },

    // Obtener los registros del usuario que está logueado
    getMyRegistros: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const registros = await Registro.find({ userId: userId }).sort({ fecha: -1 }); // Ordenar por más reciente
            res.status(200).json({ success: true, registros });
        } catch (error) {
            next(error);
        }
    },

    // Actualizar un registro propio
    updateRegistro: async (req, res, next) => {
        try {
            const { tipo, contenido } = req.body;
            const registroId = req.params.id;
            const userId = req.user.id;

            const registro = await Registro.findById(registroId);

            if (!registro) {
                return res.status(404).json({ message: 'Registro no encontrado.' });
            }

            // Verificamos que el usuario solo pueda modificar sus propios registros
            if (registro.userId.toString() !== userId) {
                return res.status(403).json({ message: 'Acceso prohibido. No puedes modificar este registro.' });
            }

            registro.tipo = tipo || registro.tipo;
            registro.contenido = contenido || registro.contenido;
            
            const registroActualizado = await registro.save();

            res.status(200).json({ success: true, message: 'Registro actualizado.', registro: registroActualizado });
        } catch (error) {
            next(error);
        }
    },

    // Eliminar un registro propio
    deleteRegistro: async (req, res, next) => {
        try {
            const registroId = req.params.id;
            const userId = req.user.id;

            const registro = await Registro.findById(registroId);

            if (!registro) {
                return res.status(404).json({ message: 'Registro no encontrado.' });
            }

            // Verificamos que el usuario solo pueda eliminar sus propios registros
            if (registro.userId.toString() !== userId) {
                return res.status(403).json({ message: 'Acceso prohibido. No puedes eliminar este registro.' });
            }

            await registro.deleteOne();

            res.status(200).json({ success: true, message: 'Registro eliminado.' });
        } catch (error) {
            next(error);
        }
    },

    getTeamRegistros: async (req, res, next) => {
            try {
                const supervisorId = req.user.id; // El ID del supervisor viene del token

                // 1. Encontrar todos los usuarios asignados a este supervisor
                const assignedUsers = await User.find({ supervisorId: supervisorId }).select('_id');

                // 2. Extraer solo los IDs de esos usuarios
                const userIds = assignedUsers.map(user => user._id);

                // 3. Buscar todos los registros cuyo 'userId' esté en la lista de IDs de su equipo
                const registros = await Registro.find({ userId: { $in: userIds } })
                    .populate('userId', 'name email') // Reemplaza el userId con el nombre y email del usuario que lo creó
                    .sort({ fecha: -1 });

                res.status(200).json({ success: true, registros });

            } catch (error) {
                next(error);
            }
        }
};

export default controller;
