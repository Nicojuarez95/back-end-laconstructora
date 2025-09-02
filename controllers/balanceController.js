import Gasto from '../models/gasto.js';
import Ingreso from '../models/ingreso.js';
import Obra from '../models/obra.js';

const balanceController = {
    getGeneral: async (req, res) => {
        try {
            const totalIngresos = await Ingreso.aggregate([
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);
            const totalGastos = await Gasto.aggregate([
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);

            const ingresos = totalIngresos.length > 0 ? totalIngresos[0].total : 0;
            const gastos = totalGastos.length > 0 ? totalGastos[0].total : 0;
            const balanceGeneral = ingresos - gastos;

            res.status(200).json({ balanceGeneral, totalIngresos: ingresos, totalGastos: gastos });
        } catch (error) {
            res.status(500).json({ message: 'Error al calcular el balance general.', error });
        }
    },

    getPorObra: async (req, res) => {
        try {
            const { obraId } = req.params;
            const obra = await Obra.findById(obraId);
            if (!obra) {
                return res.status(404).json({ message: 'Obra no encontrada.' });
            }

            const totalIngresosObra = await Ingreso.aggregate([
                { $match: { obra: obra._id } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);
            const totalGastosObra = await Gasto.aggregate([
                { $match: { obra: obra._id } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);

            const ingresos = totalIngresosObra.length > 0 ? totalIngresosObra[0].total : 0;
            const gastos = totalGastosObra.length > 0 ? totalGastosObra[0].total : 0;
            const balanceObra = ingresos - gastos;

            res.status(200).json({
                obra: obra.nombre,
                balance: balanceObra,
                totalIngresos: ingresos,
                totalGastos: gastos
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al calcular el balance por obra.', error });
        }
    },

    getMensual: async (req, res) => {
        try {
            const { year, month } = req.query;
            const startOfMonth = new Date(year, month - 1, 1);
            const endOfMonth = new Date(year, month, 0);

            const totalIngresosMensual = await Ingreso.aggregate([
                { $match: { fecha: { $gte: startOfMonth, $lte: endOfMonth } } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);
            const totalGastosMensual = await Gasto.aggregate([
                { $match: { fecha: { $gte: startOfMonth, $lte: endOfMonth } } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);

            const ingresos = totalIngresosMensual.length > 0 ? totalIngresosMensual[0].total : 0;
            const gastos = totalGastosMensual.length > 0 ? totalGastosMensual[0].total : 0;
            const balanceMensual = ingresos - gastos;

            res.status(200).json({ balanceMensual, totalIngresos: ingresos, totalGastos: gastos });
        } catch (error) {
            res.status(500).json({ message: 'Error al calcular el balance mensual.', error });
        }
    },

    getSemestral: async (req, res) => {
        try {
            const { year, semester } = req.query;
            let start, end;
            if (semester === '1') {
                start = new Date(year, 0, 1);
                end = new Date(year, 5, 30);
            } else if (semester === '2') {
                start = new Date(year, 6, 1);
                end = new Date(year, 11, 31);
            } else {
                return res.status(400).json({ message: 'El semestre debe ser 1 o 2.' });
            }

            const totalIngresosSemestral = await Ingreso.aggregate([
                { $match: { fecha: { $gte: start, $lte: end } } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);
            const totalGastosSemestral = await Gasto.aggregate([
                { $match: { fecha: { $gte: start, $lte: end } } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);

            const ingresos = totalIngresosSemestral.length > 0 ? totalIngresosSemestral[0].total : 0;
            const gastos = totalGastosSemestral.length > 0 ? totalGastosSemestral[0].total : 0;
            const balanceSemestral = ingresos - gastos;

            res.status(200).json({ balanceSemestral, totalIngresos: ingresos, totalGastos: gastos });
        } catch (error) {
            res.status(500).json({ message: 'Error al calcular el balance semestral.', error });
        }
    },

    getAnual: async (req, res) => {
        try {
            const { year } = req.query;
            const startOfYear = new Date(year, 0, 1);
            const endOfYear = new Date(year, 11, 31);

            const totalIngresosAnual = await Ingreso.aggregate([
                { $match: { fecha: { $gte: startOfYear, $lte: endOfYear } } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);
            const totalGastosAnual = await Gasto.aggregate([
                { $match: { fecha: { $gte: startOfYear, $lte: endOfYear } } },
                { $group: { _id: null, total: { $sum: "$monto" } } }
            ]);

            const ingresos = totalIngresosAnual.length > 0 ? totalIngresosAnual[0].total : 0;
            const gastos = totalGastosAnual.length > 0 ? totalGastosAnual[0].total : 0;
            const balanceAnual = ingresos - gastos;

            res.status(200).json({ balanceAnual, totalIngresos: ingresos, totalGastos: gastos });
        } catch (error) {
            res.status(500).json({ message: 'Error al calcular el balance anual.', error });
        }
    }
};

export default balanceController;