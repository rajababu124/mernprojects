const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: {
        type: String, // You need to define the type explicitly as String
        unique: true, // 'unique' should be used as an option, not as a type
        required: [true, 'Email is required'],
    },
    password: {
        type: String, // Missing the type declaration for password
        required: [true, 'Password is required'],
        minlength: [5, 'Password must be at least 5 characters'],
    },
    role: {
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
