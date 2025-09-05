import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
    // Registra un nuevo usuario (solo para administradores)
    register: async (req, res) => {
        try {
            const { nombre, password } = req.body;
            const existingUser = await User.findOne({
                nombre
            });
            if (existingUser) {
                return res.status(400).json({
                    message: 'El nombre de usuario ya existe.'
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                nombre,
                password: hashedPassword,
                rol: 'admin'
            });
            await newUser.save();
            res.status(201).json({
                message: 'Usuario registrado exitosamente.'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al registrar el usuario.',
                error
            });
        }
    },
    // Inicia sesión de un usuario y genera un token JWT
    login: async (req, res) => {
        try {
            const { nombre, password } = req.body;
            const user = await User.findOne({
                nombre
            });
            if (!user) {
                return res.status(400).json({
                    message: 'Credenciales inválidas.'
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Credenciales inválidas.'
                });
            }
            if (!user.rol) {
                user.rol = 'admin';
                await user.save();
            }
            const token = jwt.sign({
                id: user._id,
                rol: user.rol
            }, process.env.JWT_SECRET, {
                expiresIn: '12h'
            });
            res.status(200).json({
                message: 'Login exitoso.',
                token,
                user: {
                    id: user._id,
                    nombre: user.nombre,
                    rol: user.rol
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al iniciar sesión.',
                error
            });
        }
    }
};

export default authController;
