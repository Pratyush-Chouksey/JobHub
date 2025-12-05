import { useState } from 'react';
import AvatarUpload from './AvatarUpload'; // Reusing for Logo
import { MapPin, Globe, Users, Save, ShieldCheck } from 'lucide-react';

const CompanyProfile = () => {
    const [company, setCompany] = useState({
        name: 'Tech Corp',
        industry: 'Software Development',
        size: '50-100',
        website: 'https://techcorp.com',
        location: 'San Francisco, CA',
        description: 'Building the future of tech...',
        isVerified: true
    });

    return (
        <div className="space-y-8">
            {/* Banner Area */}
            <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <span className="text-sm font-medium text-white">Banner Image (Click to upload)</span>
                </div>
                {/* Logo Overlay */}
                <div className="absolute -bottom-10 left-8">
                    <div className="rounded-2xl border-4 border-slate-950 bg-slate-900 shadow-xl">
                        <AvatarUpload initialUrl={null} onUpload={() => { }} />
                        {/* Note: AvatarUpload is styled as circle, might want square for company logo but works for now */}
                    </div>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Sidebar */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                {company.name}
                                {company.isVerified && <ShieldCheck className="h-5 w-5 text-blue-500" />}
                            </h1>
                            <p className="text-slate-400">{company.industry}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-300">
                                <Users className="h-5 w-5 text-slate-500" />
                                <input
                                    className="bg-transparent focus:outline-none focus:text-white"
                                    value={company.size}
                                    onChange={(e) => setCompany({ ...company, size: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <Globe className="h-5 w-5 text-slate-500" />
                                <input
                                    className="bg-transparent focus:outline-none focus:text-white"
                                    value={company.website}
                                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <MapPin className="h-5 w-5 text-slate-500" />
                                <input
                                    className="bg-transparent focus:outline-none focus:text-white"
                                    value={company.location}
                                    onChange={(e) => setCompany({ ...company, location: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                        <h3 className="mb-4 text-lg font-bold text-white">About Company</h3>
                        <textarea
                            className="h-40 w-full rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-white focus:border-blue-500 focus:outline-none"
                            value={company.description}
                            onChange={(e) => setCompany({ ...company, description: e.target.value })}
                        />
                    </div>

                    {/* Photos / Team */}
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Life at {company.name}</h3>
                            <button className="text-sm text-blue-400">Add Photos</button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-video rounded-lg bg-slate-800 border border-white/5"></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition">
                            <Save className="h-4 w-4" /> Save Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
