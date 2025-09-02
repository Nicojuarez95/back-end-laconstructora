import Cheque from '../models/cheque.js';

const chequeController = {
    getCheques: async (req, res) => {
        try {
            const cheques = await Cheque.find().populate('proveedor obra');
            res.status(200).json(cheques);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createCheque: async (req, res) => {
        const { date, obra, amount, description, number, provider } = req.body;
        try {
            const newCheque = new Cheque({ date, obra, amount, description, number, provider });
            await newCheque.save();
            res.status(201).json(newCheque);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getChequeById: async (req, res) => {
        try {
            const { id } = req.params;
            const cheque = await Cheque.findById(id).populate('proveedor obra');
            if (!cheque) {
                return res.status(404).json({ message: 'Cheque no encontrado' });
            }
            res.status(200).json(cheque);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCheque: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedCheque = await Cheque.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCheque) {
                return res.status(404).json({ message: 'Cheque no encontrado' });
            }
            res.status(200).json(updatedCheque);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteCheque: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCheque = await Cheque.findByIdAndDelete(id);
            if (!deletedCheque) {
                return res.status(404).json({ message: 'Cheque no encontrado' });
            }
            res.status(200).json({ message: 'Cheque eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default chequeController;