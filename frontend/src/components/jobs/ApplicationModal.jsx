import { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import client from '../../api/client';
import { Button } from '../ui/Button';
import Input from '../ui/Input';

const ApplicationModal = ({ isOpen, onClose, job }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error('Please upload your resume');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobId', job._id); // Although backend uses params in some places, Apply uses body or params? Controller doesn't specify logic for JobID in body, but Apply Service uses req.body... wait. 
        // Checking controller: 
        // const application = await ApplicationService.createApplication(req.body, req.file, req.user.id);
        // Application model has `job` field. So req.body should contain `job`.
        formData.append('job', job._id);

        try {
            await client.post('/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Application submitted successfully!');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Apply for {job.title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Resume (PDF, DOCX)
                        </label>
                        <div className="relative flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-all">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="absolute inset-0 cursor-pointer opacity-0"
                            />
                            {file ? (
                                <div className="text-center">
                                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                        <Upload size={20} />
                                    </div>
                                    <p className="text-sm font-medium text-white">{file.name}</p>
                                    <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-slate-400">
                                        <Upload size={20} />
                                    </div>
                                    <p className="text-sm font-medium text-slate-300">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-500">PDF or DOCX up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationModal;
