import mongoose from 'mongoose';
const { Schema } = mongoose;

const registroSchema = new Schema({
    // Quién creó el registro. Es una referencia al modelo User.
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Es bueno indexar campos por los que se buscará frecuentemente.
    },
    // Tipo de registro (ej: "Reporte de Ventas", "Incidencia Técnica", "Tarea Diaria")
    tipo: {
        type: String,
        required: [true, 'El tipo de registro es obligatorio.'],
        trim: true
    },
    // Contenido o descripción del registro.
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio.'],
        trim: true
    },
    // Fecha en que se creó el registro.
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const Registro = mongoose.model('Registro', registroSchema);

export default Registro;
