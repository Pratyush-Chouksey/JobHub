import { useState } from 'react';
import AvatarUpload from './AvatarUpload';
import { Briefcase, GraduationCap, Plus, Trash2, Save } from 'lucide-react';

const ExperienceTimeline = ({ items, onDelete }) => (
    <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-[2px] before:bg-slate-800">
        {items.map((item, idx) => (
            <div key={idx} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[29px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-lg font-bold text-white">{item.role}</h4>
                            <p className="text-blue-400 font-medium">{item.company}</p>
                            <p className="text-xs text-slate-500">{item.duration}</p>
                        </div>
                        <button onClick={() => onDelete(idx)} className="text-slate-500 hover:text-red-400 transition">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
            </div>
        ))}
    </div>
);

const SeekerProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Pratyush Chouksey',
        title: 'Full Stack Developer',
        bio: 'Passionate about building scalable web applications.',
        skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        experience: [
            { role: 'Senior Developer', company: 'Tech Solutions', duration: '2022 - Pres', description: 'Leading frontend architecture.' },
            { role: 'Junior Developer', company: 'WebAgency', duration: '2020 - 2022', description: 'Built client websites.' }
        ]
    });

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Sidebar */}
            <div className="space-y-6 lg:col-span-1">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center">
                    <AvatarUpload onUpload={(file) => console.log(file)} />
                    <h2 className="mt-4 text-xl font-bold text-white">{profile.name}</h2>
                    <p className="text-blue-400">{profile.title}</p>

                    {/* Completion Bar */}
                    <div className="mt-6 text-left">
                        <div className="mb-1 flex justify-between text-xs text-slate-400">
                            <span>Profile Completion</span>
                            <span>85%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-bold text-white">Skills</h3>
                        <button className="text-xs text-blue-400 hover:text-blue-300">Edit</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map(skill => (
                            <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 border border-white/5">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <h3 className="mb-4 text-lg font-bold text-white">About Me</h3>
                    <textarea
                        className="h-32 w-full rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-white focus:border-blue-500 focus:outline-none"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                            <Briefcase className="h-5 w-5 text-blue-500" /> Experience
                        </h3>
                        <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                            <Plus className="h-4 w-4" /> Add
                        </button>
                    </div>
                    <ExperienceTimeline items={profile.experience} onDelete={() => { }} />
                </div>

                <div className="flex justify-end">
                    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition">
                        <Save className="h-4 w-4" /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeekerProfile;
