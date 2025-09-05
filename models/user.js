import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: 'admin' }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
