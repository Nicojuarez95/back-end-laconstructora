import Ingreso from '../models/ingreso.js';
import Cheque from '../models/cheque.js';

const ingresoController = {
    getIngresos: async (req, res) => {
        try {
            // Eliminamos .populate('cheque') porque ya no es una referencia
            const ingresos = await Ingreso.find().populate('obra');
            res.status(200).json(ingresos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createIngreso: async (req, res) => {
        const { fecha, obra, monto, descripcion, formaDePago, chequeId } = req.body;
        try {
            const newIngreso = new Ingreso({ 
                fecha, 
                obra, 
                monto, 
                descripcion, 
                formaDePago, 
                cheque: chequeId // Guardamos el número de cheque directamente
            });
            await newIngreso.save();
            res.status(201).json(newIngreso);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    createIngresoFromCheque: async (req, res) => {
        const { chequeId, fecha, descripcion } = req.body;
        try {
            // Buscamos el cheque por su número, no por su ID de MongoDB
            const cheque = await Cheque.findOne({ numero: chequeId });
            if (!cheque) {
                return res.status(404).json({ message: 'Cheque no encontrado' });
            }

            const newIngreso = new Ingreso({
                fecha,
                obra: cheque.obra,
                monto: cheque.monto,
                descripcion: descripcion || `Ingreso de cheque # ${cheque.numero}`,
                cheque: cheque.numero, // Guardamos el número del cheque
                formaDePago: 'cheque',
            });

            await newIngreso.save();
            res.status(201).json(newIngreso);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getIngresoById: async (req, res) => {
        try {
            const { id } = req.params;
            // Eliminamos .populate('cheque')
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
            const { fecha, obra, monto, descripcion, formaDePago, chequeId } = req.body;
            const updatePayload = { fecha, obra, monto, descripcion, formaDePago, cheque: chequeId };
            
            const updatedIngreso = await Ingreso.findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true });
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