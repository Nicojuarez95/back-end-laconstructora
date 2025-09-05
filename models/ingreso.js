import mongoose from 'mongoose';

const ingresoSchema = new mongoose.Schema({
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String },
    obra: { type: mongoose.Schema.Types.ObjectId, ref: 'Obra' },
    formaDePago: {
        type: String,
        enum: ['transferencia', 'cheque', 'efectivo'],
        required: true
    },
    // Cambio clave: `cheque` ahora es un String para guardar el número de cheque
    cheque: { type: String, required: false } 
}, {
    timestamps: true
});

const Ingreso = mongoose.model('Ingreso', ingresoSchema);
export default Ingreso;