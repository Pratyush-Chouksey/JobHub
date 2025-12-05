import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StepIndicator = ({ step, label, currentStep }) => (
    <div className={`flex items-center gap-2 ${currentStep >= step ? 'text-blue-500' : 'text-slate-600'}`}>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold ${currentStep >= step ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700'}`}>
            {step}
        </div>
        <span className="hidden sm:block text-sm font-medium">{label}</span>
    </div>
);

const JobForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '', location: '', type: 'Full-time', salaryMin: 0, salaryMax: 0, description: '', skills: ''
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-8">
                <StepIndicator step={1} label="Job Details" currentStep={step} />
                <div className="h-[2px] w-12 bg-slate-800"></div>
                <StepIndicator step={2} label="Description" currentStep={step} />
                <div className="h-[2px] w-12 bg-slate-800"></div>
                <StepIndicator step={3} label="Review" currentStep={step} />
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white">Basic Information</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Job Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g. Senior React Developer"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-400">Location</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g. Remote"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                        {/* Add more fields (Salary, Type) here for brevity I'm skipping */}
                        <button onClick={nextStep} className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500">
                            Next Step
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white">Description & Requirements</h2>
                        <div className="bg-white rounded-lg overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={formData.description}
                                onChange={v => setFormData({ ...formData, description: v })}
                                className="bg-slate-900 text-white"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevStep} className="rounded-lg bg-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-600">Back</button>
                            <button onClick={nextStep} className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500">Next Step</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white">Review & Post</h2>
                        <div className="rounded-lg bg-slate-900/50 p-6">
                            <h3 className="text-lg font-bold text-white">{formData.title || 'Untitled Job'}</h3>
                            <p className="text-slate-400">{formData.location}</p>
                            <div className="mt-4 prose prose-invert" dangerouslySetInnerHTML={{ __html: formData.description }}></div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevStep} className="rounded-lg bg-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-600">Back</button>
                            <button className="rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-500">Publish Job</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobForm;
