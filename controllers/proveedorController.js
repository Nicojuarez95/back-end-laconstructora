import Proveedor from '../models/proveedor.js';

const proveedorController = {
    getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.find();
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createProveedor: async (req, res) => {
        const { name, direccion, contacto } = req.body;
        try {
            const newProveedor = new Proveedor({ name, direccion, contacto });
            await newProveedor.save();
            res.status(201).json(newProveedor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getProveedorById: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await Proveedor.findById(id);
            if (!proveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedProveedor = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedProveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            res.status(200).json(updatedProveedor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedProveedor = await Proveedor.findByIdAndDelete(id);
            if (!deletedProveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default proveedorController;