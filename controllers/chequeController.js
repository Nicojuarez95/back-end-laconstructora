import Cheque from '../models/cheque.js';

const chequeController = {
    // Crea un nuevo cheque
    create: async (req, res) => {
        try {
            const newCheque = new Cheque(req.body);
            await newCheque.save();
            res.status(201).json(newCheque);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el cheque.', error });
        }
    },
    // Obtiene todos los cheques, opcionalmente por estado o proveedor
    getAll: async (req, res) => {
        try {
            const { estado, proveedorId, obraId } = req.query;
            let query = {};
            if (estado) {
                query.estado = estado;
            }
            if (proveedorId) {
                query.proveedor = proveedorId;
            }
            if (obraId) {
                query.obra = obraId;
            }
            const cheques = await Cheque.find(query).populate('proveedor').populate('obra');
            res.status(200).json(cheques);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los cheques.', error });
        }
    },
    // Obtiene un cheque por su ID
    getById: async (req, res) => {
        try {
            const cheque = await Cheque.findById(req.params.id).populate('proveedor').populate('obra');
            if (!cheque) {
                return res.status(404).json({ message: 'Cheque no encontrado.' });
            }
            res.status(200).json(cheque);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el cheque.', error });
        }
    },
    // Obtiene los cheques próximos a vencer
    getProximosVencimientos: async (req, res) => {
        try {
            const hoy = new Date();
            const fechaLimite = new Date();
            fechaLimite.setDate(hoy.getDate() + 30); // Próximos 30 días

            const cheques = await Cheque.find({
                fechaCobro: { $gte: hoy, $lte: fechaLimite },
                estado: { $in: ['en cartera', 'depositado', 'al portador'] } // Puedes ajustar los estados según tu lógica
            }).populate('proveedor').populate('obra');
            
            res.status(200).json(cheques);
        } catch (error) {
            res.status(500).json({ message: 'Error al cargar los próximos vencimientos.', error });
        }
    },
    // Actualiza un cheque por su ID
    update: async (req, res) => {
        try {
            const updatedCheque = await Cheque.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCheque) {
                return res.status(404).json({ message: 'Cheque no encontrado.' });
            }
            res.status(200).json(updatedCheque);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el cheque.', error });
        }
    },
    // Elimina un cheque por su ID
    delete: async (req, res) => {
        try {
            const deletedCheque = await Cheque.findByIdAndDelete(req.params.id);
            if (!deletedCheque) {
                return res.status(404).json({ message: 'Cheque no encontrado.' });
            }
            res.status(200).json({ message: 'Cheque eliminado exitosamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el cheque.', error });
        }
    }
};

export default chequeController;