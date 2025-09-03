import Obra from '../models/obra.js';

const obraController = {
    // Crea una nueva obra
    create: async (req, res) => {
        try {
            const { nombre, ubicacion, descripcion, cuit } = req.body;
            const newObra = new Obra({ nombre, ubicacion, descripcion, cuit });
            await newObra.save();
            return res.status(201).json(newObra);
        } catch (error) {
            return res.status(400).json({ message: 'Error al crear la obra.', error });
        }
    },

    // Obtiene todas las obras
    getAll: async (req, res) => {
        try {
            const obras = await Obra.find();
            return res.status(200).json(obras);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener las obras.', error });
        }
    },

    // Obtiene una obra por su ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const obra = await Obra.findById(id);
            if (!obra) {
                return res.status(404).json({ message: 'Obra no encontrada.' });
            }
            return res.status(200).json(obra);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener la obra.', error });
        }
    },

    // Actualiza una obra por su ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedObra = await Obra.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedObra) {
                return res.status(404).json({ message: 'Obra no encontrada.' });
            }
            return res.status(200).json(updatedObra);
        } catch (error) {
            return res.status(400).json({ message: 'Error al actualizar la obra.', error });
        }
    },

    // Elimina una obra por su ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedObra = await Obra.findByIdAndDelete(id);
            if (!deletedObra) {
                return res.status(404).json({ message: 'Obra no encontrada.' });
            }
            return res.status(200).json({ message: 'Obra eliminada correctamente.' });
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar la obra.', error });
        }
    }
};

export default obraController;
