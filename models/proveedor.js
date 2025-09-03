import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    cuit: { type: String, unique: true },
    telefono: { type: String },
    localidad: { type: String }
}, {
    timestamps: true
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

export default Proveedor;