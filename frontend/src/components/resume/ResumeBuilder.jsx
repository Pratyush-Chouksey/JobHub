import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, LayoutTemplate } from 'lucide-react';

const ResumeBuilder = () => {
    const [data, setData] = useState({
        name: 'John Doe',
        title: 'Software Engineer',
        email: 'john@example.com',
        summary: 'Experienced developer...',
        skills: 'React, Node.js',
        experience: []
    });

    const printRef = useRef();

    const handleDownload = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resume.pdf');
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row overflow-hidden bg-slate-950 text-white">
            {/* Editor Sidebar */}
            <div className="w-full overflow-y-auto border-r border-white/5 bg-slate-900 p-6 lg:w-1/3">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Resume Builder</h2>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold shadow-lg hover:bg-blue-500"
                    >
                        <Download className="h-4 w-4" /> PDF
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-400">Full Name</label>
                        <input className="w-full rounded bg-white/5 p-2 text-sm text-white" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400">Professional Title</label>
                        <input className="w-full rounded bg-white/5 p-2 text-sm text-white" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400">Summary</label>
                        <textarea className="w-full rounded bg-white/5 p-2 text-sm text-white h-24" value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} />
                    </div>
                    {/* More fields would go here */}
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-y-auto bg-slate-800 p-8 flex justify-center">
                {/* A4 Paper Aspect Ratio */}
                <div ref={printRef} className="h-[297mm] w-[210mm] bg-white text-black shadow-2xl p-10 transform scale-75 origin-top">
                    <header className="border-b-2 border-slate-800 pb-4 mb-6">
                        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-widest">{data.name}</h1>
                        <p className="text-xl text-slate-600">{data.title}</p>
                        <p className="text-sm text-slate-500 mt-2">{data.email}</p>
                    </header>

                    <section className="mb-6">
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-2 uppercase tracking-wider">Summary</h3>
                        <p className="text-sm leading-relaxed">{data.summary}</p>
                    </section>

                    <section className="mb-6">
                        <h3 className="text-lg font-bold border-b border-slate-300 mb-2 uppercase tracking-wider">Skills</h3>
                        <p className="text-sm">{data.skills}</p>
                    </section>

                    {/* Placeholder for robustness */}
                    <div className="h-40 border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                        Experience Sections would appear here dynamically
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
