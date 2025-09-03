import mongoose from 'mongoose';

const chequeSchema = new mongoose.Schema({
    numero: { type: String, required: true, unique: true },
    banco: { type: String, required: true },
    monto: { type: Number, required: true },
    fechaEmision: { type: Date, default: Date.now },
    fechaCobro: { type: Date, required: true },
    estado: {
        type: String,
        enum: ['en cartera', 'depositado', 'cobrado', 'rechazado', 'endosado'],
        default: 'en cartera'
    },
    // Relación con el proveedor que emitió el cheque
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
    // Relación con la obra por la que se recibió el cheque
    obra: { type: mongoose.Schema.Types.ObjectId, ref: 'Obra' },
    descripcion: { type: String }
}, {
    timestamps: true
});

const Cheque = mongoose.model('Cheque', chequeSchema);
export default Cheque;
