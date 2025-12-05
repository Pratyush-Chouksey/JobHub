import { Shield, Zap, Globe, Users, TrendingUp, Award } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <div className={`glass group relative overflow-hidden rounded-2xl p-8 transition-all hover:-translate-y-1 hover:bg-white/5`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    </div>
);

const Features = () => {
    const features = [
        { icon: Zap, title: "Instant Matching", description: "Our AI matches you with jobs based on your true skills, not just keywords." },
        { icon: Shield, title: "Verified Companies", description: "Every employer is manually verified to ensure legitimate opportunities." },
        { icon: Globe, title: "Remote Native", description: "Built for the future of work. Find remote roles globally." },
        { icon: Users, title: "Direct Contact", description: "Chat directly with hiring managers. No more black holes." },
        { icon: TrendingUp, title: "Career Insights", description: "Real-time salary data and market trends at your fingertips." },
        { icon: Award, title: "Skill Assessment", description: "Prove your worth with built-in technical challenges." },
    ];

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute left-[20%] top-[40%] h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Why leading talent chooses <span className="text-blue-500">JobHub</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-400">
                        We've reimagined the recruitment process to be transparent, efficient, and empowering.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
