import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatItem = ({ end, label, suffix = '' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl font-bold text-white sm:text-5xl">
                {inView ? <CountUp end={end} duration={2.5} separator="," /> : '0'}
                <span className="text-blue-500">{suffix}</span>
            </div>
            <div className="mt-2 text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</div>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="relative border-y border-white/5 bg-slate-900/50 py-20 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-y-10 gap-x-8 md:grid-cols-4">
                    <StatItem end={12000} label="Active Jobs" suffix="+" />
                    <StatItem end={850} label="Companies" suffix="" />
                    <StatItem end={50000} label="Job Seekers" suffix="+" />
                    <StatItem end={98} label="Success Rate" suffix="%" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
