import { Search, MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div className="animate-fade-in-up">
                    <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-md">
                        🚀 The #1 Platform for Modern Teams
                    </span>
                    <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
                        Find the job that <span className="text-gradient">defines you.</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                        Connect with top-tier companies and startups. We make recruitment seamless, smart, and human-centric.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="animate-fade-in-up animate-delay-200 mt-10">
                    <div className="glass mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl p-2 sm:flex-row">
                        <div className="flex w-full items-center px-4">
                            <Search className="h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Job title or keyword..."
                                className="w-full bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
                            />
                        </div>
                        <div className="hidden h-8 w-[1px] bg-white/10 sm:block"></div>
                        <div className="flex w-full items-center px-4">
                            <MapPin className="h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
                            />
                        </div>
                        <button className="w-full rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition hover:bg-blue-500 sm:w-auto">
                            Search
                        </button>
                    </div>
                </div>

                {/* Companies / Stats preview could go here */}
                <div className="animate-fade-in-up animate-delay-300 mt-12 flex justify-center gap-8 opacity-60 grayscale filter">
                    {/* Brand Logos Placeholders - Just Text for now */}
                    <span className="text-xl font-bold text-white">GOOGLE</span>
                    <span className="text-xl font-bold text-white">META</span>
                    <span className="text-xl font-bold text-white">NETFLIX</span>
                    <span className="text-xl font-bold text-white">AIRBNB</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;
