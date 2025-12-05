import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
            default: 'pending',
            index: true,
        },
        coverLetter: {
            type: String,
        },
        resumeUrl: {
            type: String, // Can override user's default resume
            required: [true, 'Resume is required for application'],
        },
        employerNotes: {
            type: String, // Notes visible only to employers
            select: false, // Hidden by default for safety
        },
    },
    {
        timestamps: true,
    }
);

// Prevent user from applying to the same job twice
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Static method to calculate application stats for a job (Optional for scaling)
applicationSchema.statics.getJobStats = async function (jobId) {
    // Aggregate stats logic here if needed
};

// Post-save hook to update Job's application count
applicationSchema.post('save', async function () {
    try {
        const Job = this.model('Job');
        const count = await this.model('Application').countDocuments({ job: this.job });
        await Job.findByIdAndUpdate(this.job, { applicationCount: count });
    } catch (err) {
        console.error(err);
    }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
