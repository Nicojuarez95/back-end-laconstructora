import Ingreso from '../models/ingreso.js';

const ingresoController = {
    getIngresos: async (req, res) => {
        try {
            const ingresos = await Ingreso.find().populate('obra');
            res.status(200).json(ingresos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createIngreso: async (req, res) => {
        const { date, obra, amount, description } = req.body;
        try {
            const newIngreso = new Ingreso({ date, obra, amount, description });
            await newIngreso.save();
            res.status(201).json(newIngreso);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getIngresoById: async (req, res) => {
        try {
            const { id } = req.params;
            const ingreso = await Ingreso.findById(id).populate('obra');
            if (!ingreso) {
                return res.status(404).json({ message: 'Ingreso no encontrado' });
            }
            res.status(200).json(ingreso);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateIngreso: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedIngreso = await Ingreso.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedIngreso) {
                return res.status(404).json({ message: 'Ingreso no encontrado' });
            }
            res.status(200).json(updatedIngreso);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteIngreso: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedIngreso = await Ingreso.findByIdAndDelete(id);
            if (!deletedIngreso) {
                return res.status(404).json({ message: 'Ingreso no encontrado' });
            }
            res.status(200).json({ message: 'Ingreso eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ingresoController;