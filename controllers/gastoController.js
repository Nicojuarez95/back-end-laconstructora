import Gasto from '../models/gasto.js';

const gastoController = {
    // Crea un nuevo gasto
    create: async (req, res) => {
        try {
            const { monto, fecha, descripcion, obra, proveedor } = req.body;
            // Asegúrate de que al menos una referencia (obra o proveedor) esté presente
            if (!obra && !proveedor) {
                return res.status(400).json({ message: 'Se requiere una obra o un proveedor para el gasto.' });
            }
            const newGasto = new Gasto({
                monto,
                fecha,
                descripcion,
                obra,
                proveedor
            });
            await newGasto.save();
            res.status(201).json(newGasto);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el gasto.', error });
        }
    },
    // Obtiene todos los gastos, opcionalmente por obra o proveedor
    getAll: async (req, res) => {
        try {
            const { obraId, proveedorId } = req.query;
            let query = {};
            if (obraId) {
                query.obra = obraId;
            }
            if (proveedorId) {
                query.proveedor = proveedorId;
            }
            const gastos = await Gasto.find(query).populate('obra').populate('proveedor');
            res.status(200).json(gastos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los gastos.', error });
        }
    },
    // Obtiene un gasto por su ID
    getById: async (req, res) => {
        try {
            const gasto = await Gasto.findById(req.params.id).populate('obra').populate('proveedor');
            if (!gasto) {
                return res.status(404).json({ message: 'Gasto no encontrado.' });
            }
            res.status(200).json(gasto);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el gasto.', error });
        }
    },
    // Actualiza un gasto por su ID
    update: async (req, res) => {
        try {
            const updatedGasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedGasto) {
                return res.status(404).json({ message: 'Gasto no encontrado.' });
            }
            res.status(200).json(updatedGasto);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el gasto.', error });
        }
    },
    // Elimina un gasto por su ID
    delete: async (req, res) => {
        try {
            const deletedGasto = await Gasto.findByIdAndDelete(req.params.id);
            if (!deletedGasto) {
                return res.status(404).json({ message: 'Gasto no encontrado.' });
            }
            res.status(200).json({ message: 'Gasto eliminado exitosamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el gasto.', error });
        }
    }
};

export default gastoController;
