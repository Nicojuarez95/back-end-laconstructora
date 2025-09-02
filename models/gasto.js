import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String },
    obra: { type: mongoose.Schema.Types.ObjectId, ref: 'Obra', required: true }
}, {
    timestamps: true
});

const Gasto = mongoose.model('Gasto', gastoSchema);
export default Gasto;
