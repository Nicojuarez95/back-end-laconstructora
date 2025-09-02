import mongoose from 'mongoose';

const ingresoSchema = new mongoose.Schema({
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String },
    obra: { type: mongoose.Schema.Types.ObjectId, ref: 'Obra' }
}, {
    timestamps: true
});

const Ingreso = mongoose.model('Ingreso', ingresoSchema);
export default Ingreso;
