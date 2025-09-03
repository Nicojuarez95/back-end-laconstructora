import Proveedor from '../models/proveedor.js';

const proveedorController = {
    // Crea un nuevo proveedor
    create: async (req, res) => {
        try {
            const newProveedor = new Proveedor(req.body);
            await newProveedor.save();
            res.status(201).json(newProveedor);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el proveedor.', error });
        }
    },
    // Obtiene todos los proveedores
    getAll: async (req, res) => {
        try {
            const proveedores = await Proveedor.find();
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los proveedores.', error });
        }
    },
    // Obtiene un proveedor por su ID
    getById: async (req, res) => {
        try {
            const proveedor = await Proveedor.findById(req.params.id);
            if (!proveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado.' });
            }
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el proveedor.', error });
        }
    },
    // Actualiza un proveedor por su ID
    update: async (req, res) => {
        try {
            const updatedProveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedProveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado.' });
            }
            res.status(200).json(updatedProveedor);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el proveedor.', error });
        }
    },
    // Elimina un proveedor por su ID
    delete: async (req, res) => {
        try {
            const deletedProveedor = await Proveedor.findByIdAndDelete(req.params.id);
            if (!deletedProveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado.' });
            }
            res.status(200).json({ message: 'Proveedor eliminado exitosamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el proveedor.', error });
        }
    }
};

export default proveedorController;
