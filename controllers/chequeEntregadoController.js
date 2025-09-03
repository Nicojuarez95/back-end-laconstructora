import ChequeEntregado from '../models/chequeEntregado.js';

const chequeEntregadoController = {
    // Crea un nuevo cheque entregado
    create: async (req, res) => {
        try {
            const newCheque = new ChequeEntregado(req.body);
            await newCheque.save();
            res.status(201).json(newCheque);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el cheque entregado.', error });
        }
    },
    // Obtiene todos los cheques entregados, opcionalmente por estado o proveedor
    getAll: async (req, res) => {
        try {
            const { estado, proveedorId } = req.query;
            let query = {};
            if (estado) {
                query.estado = estado;
            }
            if (proveedorId) {
                query.proveedor = proveedorId;
            }
            const cheques = await ChequeEntregado.find(query).populate('proveedor');
            res.status(200).json(cheques);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los cheques entregados.', error });
        }
    },
    // Obtiene un cheque entregado por su ID
    getById: async (req, res) => {
        try {
            const cheque = await ChequeEntregado.findById(req.params.id).populate('proveedor');
            if (!cheque) {
                return res.status(404).json({ message: 'Cheque no encontrado.' });
            }
            res.status(200).json(cheque);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el cheque.', error });
        }
    },
    // Actualiza un cheque entregado por su ID
    update: async (req, res) => {
        try {
            const updatedCheque = await ChequeEntregado.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCheque) {
                return res.status(404).json({ message: 'Cheque no encontrado.' });
            }
            res.status(200).json(updatedCheque);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el cheque.', error });
        }
    },
    // Elimina un cheque entregado por su ID
    delete: async (req, res) => {
        try {
            const deletedCheque = await ChequeEntregado.findByIdAndDelete(req.params.id);
            if (!deletedCheque) {
                return res.status(404).json({ message: 'Cheque no encontrado.' });
            }
            res.status(200).json({ message: 'Cheque eliminado exitosamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el cheque.', error });
        }
    }
};

export default chequeEntregadoController;
