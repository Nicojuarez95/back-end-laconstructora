import mongoose from 'mongoose';

const obraSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    cuit: { type: String, unique: true, required: true },
    descripcion: { type: String },
    fechaInicio: { type: Date, default: Date.now },
    estado: { type: String, default: 'En progreso' }
}, {
    timestamps: true
});

const Obra = mongoose.model('Obra', obraSchema);
export default Obra;
