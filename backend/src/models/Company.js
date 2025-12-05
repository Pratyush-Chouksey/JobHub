import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
            unique: true,
            index: true,
        },
        description: {
            type: String,
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        website: {
            type: String,
            match: [
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                'Please provide a valid URL',
            ],
        },
        logoUrl: {
            type: String,
            default: '',
        },
        location: {
            city: String,
            state: String,
            country: String,
        },
        industry: {
            type: String,
            required: true,
            index: true,
        },
        size: {
            type: String,
            enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
        },
        foundedYear: {
            type: Number,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        socialLinks: {
            linkedin: String,
            twitter: String,
            facebook: String,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes for Search
companySchema.index({ name: 'text', description: 'text', industry: 'text' });

// Virtual to get active jobs count (needs population usually, or aggregate)
companySchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'company',
    count: true,
});

const Company = mongoose.model('Company', companySchema);

export default Company;
