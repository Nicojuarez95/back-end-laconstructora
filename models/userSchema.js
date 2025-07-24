import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Por favor, introduce un email válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ['administrador', 'supervisor', 'usuario'],
            message: '{VALUE} no es un rol válido'
        },
        default: 'usuario'
    },
    // --- NUEVO CAMPO ---
    // Guardará el ID del supervisor al que este usuario está asignado.
    // Es de tipo ObjectId y hace referencia a otro documento en la misma colección 'User'.
    supervisorId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia a la colección de Usuarios
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
