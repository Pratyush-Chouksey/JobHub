import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-20 shadow-2xl sm:px-12 lg:px-16 text-center">

                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 h-full w-full opacity-10">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <div className="relative z-10 mx-auto max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to shape your future?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
                            Join over 50,000+ professionals and 800+ companies building the future together.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-blue-600 shadow-sm hover:bg-blue-50 transition">
                                Get Started Now
                            </button>
                            <button className="flex items-center gap-2 text-sm font-semibold leading-6 text-white hover:text-blue-100 transition">
                                Contact Sales <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
