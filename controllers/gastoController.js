import Gasto from '../models/gasto.js';

const gastoController = {
    getGastos: async (req, res) => {
        try {
            const gastos = await Gasto.find().populate('obra');
            res.status(200).json(gastos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createGasto: async (req, res) => {
        const { date, obra, amount, description } = req.body;
        try {
            const newGasto = new Gasto({ date, obra, amount, description });
            await newGasto.save();
            res.status(201).json(newGasto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getGastoById: async (req, res) => {
        try {
            const { id } = req.params;
            const gasto = await Gasto.findById(id).populate('obra');
            if (!gasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.status(200).json(gasto);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateGasto: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedGasto = await Gasto.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedGasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.status(200).json(updatedGasto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteGasto: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedGasto = await Gasto.findByIdAndDelete(id);
            if (!deletedGasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.status(200).json({ message: 'Gasto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default gastoController;