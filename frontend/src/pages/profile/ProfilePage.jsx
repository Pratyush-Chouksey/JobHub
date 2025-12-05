import Navbar from '../../components/landing/Navbar';
import SeekerProfile from '../../components/profile/SeekerProfile';
import ApplicationTracker from '../../components/profile/ApplicationTracker';
import { useState } from 'react';

const ProfilePage = () => {
    const [tab, setTab] = useState('profile');

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
            <Navbar />
            <main className="pt-24 pb-12">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">

                    {/* Tabs */}
                    <div className="mb-8 flex gap-6 border-b border-white/5">
                        <button
                            onClick={() => setTab('profile')}
                            className={`pb-4 text-sm font-bold transition ${tab === 'profile' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            My Profile
                        </button>
                        <button
                            onClick={() => setTab('applications')}
                            className={`pb-4 text-sm font-bold transition ${tab === 'applications' ? 'border-b-2 border-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Applications
                        </button>
                    </div>

                    {tab === 'profile' ? <SeekerProfile /> : <ApplicationTracker />}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
