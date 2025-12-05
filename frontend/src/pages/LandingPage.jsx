import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Features from '../components/landing/Features';
import CTA from '../components/landing/CTA';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
            <Navbar />
            <main>
                <Hero />
                <section id="how-it-works">
                    <Stats />
                </section>
                <section id="features">
                    <Features />
                </section>
                <section id="testimonials">
                    {/* Testimonials could be added here */}
                </section>
                <CTA />
            </main>

            <footer className="border-t border-white/5 py-12 text-center text-slate-500">
                <p>&copy; 2024 JobHub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
