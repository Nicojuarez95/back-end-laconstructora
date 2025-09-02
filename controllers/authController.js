import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
    // Registra un nuevo usuario (solo para administradores)
    register: async (req, res) => {
        try {
            const { email, password, nombre } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword,
                nombre,
                rol: 'admin' // Rol por defecto, se puede cambiar si es necesario
            });
            await newUser.save();
            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario.', error });
        }
    },
    // Inicia sesión de un usuario y genera un token JWT
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Credenciales inválidas.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Credenciales inválidas.' });
            }
            const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login exitoso.', token });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión.', error });
        }
    }
};

export default authController;
