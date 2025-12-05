import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
            index: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['seeker', 'employer', 'admin'],
            default: 'seeker',
            index: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        // Company for Employers
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            // Only required if role is employer AND they are associated with a company
            validate: {
                validator: function (v) {
                    if (this.role === 'employer' && this.companyRequired) return !!v;
                    return true;
                },
                message: 'Employer must belong to a company',
            },
        },
        jobTitle: String, // For Current Job / Employer Title

        // Seeker Profile Data
        profile: {
            skills: [String],
            experience: [
                {
                    title: String,
                    company: String,
                    from: Date,
                    to: Date,
                    current: Boolean,
                    description: String,
                },
            ],
            education: [
                {
                    school: String,
                    degree: String,
                    fieldOfStudy: String,
                    from: Date,
                    to: Date,
                },
            ],
            resumeUrl: String,
            portfolioUrl: String,
            bio: String,
        },

        deletedAt: {
            type: Date,
            default: null, // For soft delete
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Soft Delete Middleware (exclude deleted users from find)
userSchema.pre(/^find/, function (next) {
    this.find({ deletedAt: null });
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
