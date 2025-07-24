import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

const controller = {
    // --- Autenticación ---

    register: async (req, res, next) => {
        try {
            // Usamos email para el registro ya que es un campo único.
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos.' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            
            // Ocultamos el password del objeto que se devuelve
            newUser.password = undefined;

            return res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                user: newUser
            });
        } catch (error) {
            next(error);
        }
    },

    sign_in: async (req, res, next) => {
        try {
            // Usamos email para el login.
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
            }

            // Buscamos al usuario y traemos explícitamente la contraseña
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
            
            // Ocultamos el password del objeto que se devuelve
            user.password = undefined;

            return res.status(200).json({
                success: true,
                message: 'Usuario autenticado exitosamente',
                token,
                user
            });
        } catch (error) {
            next(error);
        }
    },

    // --- Gestión de Usuarios (Rutas Protegidas) ---

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json({ success: true, users });
        } catch (error) {
            next(error);
        }
    },

    getUserProfile: async (req, res, next) => {
        try {
            // El usuario autenticado está en req.user (gracias a authenticateToken)
            const authenticatedUser = req.user;
            const requestedUserId = req.params.id;

            // Un administrador puede ver cualquier perfil.
            // Otros usuarios (supervisor, usuario) solo pueden ver su propio perfil.
            if (authenticatedUser.role !== 'administrador' && authenticatedUser.id !== requestedUserId) {
                return res.status(403).json({ message: 'Acceso prohibido. No puedes ver perfiles ajenos.' });
            }
            
            const userProfile = await User.findById(requestedUserId);
            if (!userProfile) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ success: true, user: userProfile });
        } catch (error) {
            next(error);
        }
    },

    updateUserRole: async (req, res, next) => {
        try {
            const { role } = req.body;
            if (!role) {
                return res.status(400).json({ message: 'El campo "role" es requerido.' });
            }

            const userToUpdate = await User.findByIdAndUpdate(
                req.params.id,
                { role },
                { new: true, runValidators: true } // new:true devuelve el doc actualizado, runValidators corre las validaciones del schema
            );

            if (!userToUpdate) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            res.status(200).json({ success: true, message: 'Rol actualizado correctamente.', user: userToUpdate });
        } catch (error) {
            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const userToDelete = await User.findById(req.params.id);

            if (!userToDelete) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            // Un administrador no puede eliminarse a sí mismo.
            // req.user.id viene del token JWT.
            if (req.user.id === userToDelete._id.toString()) {
                return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta de administrador.' });
            }

            // Usamos deleteOne() en el documento encontrado
            await userToDelete.deleteOne();

            res.status(200).json({ success: true, message: 'Usuario eliminado correctamente.' });

        } catch (error) {
            next(error);
        }
    },

    assignSupervisor: async (req, res, next) => {
        try {
            const { supervisorId } = req.body; // El ID del supervisor a asignar
            const userId = req.params.id;     // El ID del usuario que será asignado

            // Validar que el usuario a asignar exista
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario a asignar no encontrado.' });
            }

            // Si se proporciona un supervisorId, validar que exista y que sea un supervisor
            if (supervisorId) {
                const supervisor = await User.findById(supervisorId);
                if (!supervisor || supervisor.role !== 'supervisor') {
                    return res.status(404).json({ message: 'El ID proporcionado no corresponde a un supervisor válido.' });
                }
            }
            
            // Asignar el supervisor (o quitarlo si supervisorId es null)
            user.supervisorId = supervisorId || null;
            await user.save();

            res.status(200).json({ success: true, message: 'Supervisor asignado correctamente.', user });

        } catch (error) {
            next(error);
        }
    },

    getAssignedUsers: async (req, res, next) => {
        try {
            // El ID del supervisor logueado viene del token
            const supervisorId = req.user.id; 

            const assignedUsers = await User.find({ supervisorId: supervisorId });

            res.status(200).json({ success: true, users: assignedUsers });

        } catch (error) {
            next(error);
        }
    }
};

export default controller;