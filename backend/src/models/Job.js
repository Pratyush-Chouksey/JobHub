import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a job title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
            index: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
            index: true,
        },
        recruiter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        requirements: {
            type: String,
            required: [true, 'Please add job requirements'],
        },
        salary: {
            min: { type: Number },
            max: { type: Number },
            currency: { type: String, default: 'USD' },
            isNegotiable: { type: Boolean, default: false },
        },
        location: {
            type: String,
            required: [true, 'Please add a location (or Remote)'],
            index: true,
        },
        type: {
            type: String,
            enum: ['Onsite', 'Remote', 'Hybrid'],
            default: 'Onsite',
            index: true,
        },
        employmentType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
            default: 'Full-time',
        },
        skills: {
            type: [String],
            index: true,
        },
        status: {
            type: String,
            enum: ['active', 'closed', 'draft'],
            default: 'active',
            index: true,
        },
        deadline: {
            type: Date,
        },
        applicationCount: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes
// Compound index for efficient search filtering
jobSchema.index({ type: 1, employmentType: 1, status: 1 });
// Text index for keyword search
jobSchema.index({ title: 'text', description: 'text', 'skills': 'text' });

// Middleware to prevent viewing deleted jobs
jobSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
