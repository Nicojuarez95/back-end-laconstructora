import mongoose from 'mongoose';

const chequeEntregadoSchema = new mongoose.Schema({
    numero: { type: String, required: true, unique: true },
    banco: { type: String, required: true },
    monto: { type: Number, required: true },
    fechaEmision: { type: Date, default: Date.now },
    fechaVencimiento: { type: Date, required: true },
    estado: {
        type: String,
        enum: ['entregado', 'cobrado', 'anulado'],
        default: 'entregado'
    },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    descripcion: { type: String }
}, {
    timestamps: true
});

const ChequeEntregado = mongoose.model('ChequeEntregado', chequeEntregadoSchema);
export default ChequeEntregado;
