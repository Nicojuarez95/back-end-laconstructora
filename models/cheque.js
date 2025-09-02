import mongoose from 'mongoose';

const chequeSchema = new mongoose.Schema({
    numero: { type: String, required: true, unique: true },
    banco: { type: String, required: true },
    monto: { type: Number, required: true },
    fechaEmision: { type: Date, default: Date.now },
    fechaVencimiento: { type: Date, required: true },
    estado: {
        type: String,
        enum: ['en cartera', 'depositado', 'cobrado', 'rechazado', 'endosado'],
        default: 'en cartera'
    },
    // Referencia a la obra de la que se recibió el cheque
    obra: { type: mongoose.Schema.Types.ObjectId, ref: 'Obra' },
    // Referencia al proveedor al que se le pagó con el cheque
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' },
    descripcion: { type: String }
}, {
    timestamps: true
});

const Cheque = mongoose.model('Cheque', chequeSchema);
export default Cheque;
