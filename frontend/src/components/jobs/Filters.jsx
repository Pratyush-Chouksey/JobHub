import { useJobs } from '../../context/JobContext';

const FilterSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold text-white">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`h-5 w-5 rounded border flex items-center justify-center transition ${checked ? 'bg-blue-600 border-blue-600' : 'border-slate-600 bg-transparent group-hover:border-slate-500'}`}>
            {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
        <span className={`text-sm ${checked ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>{label}</span>
    </label>
);

const Filters = () => {
    const { filters, updateFilter } = useJobs();

    // Helper single select for simplicity in MVP, could be array for multi
    const toggleType = (type) => {
        updateFilter('type', filters.type === type ? '' : type);
    };

    return (
        <div className="w-64 flex-shrink-0 hidden xl:block">
            <div className="sticky top-24">
                <h2 className="text-lg font-bold text-white mb-6">Filters</h2>

                <FilterSection title="Job Type">
                    <Checkbox label="Full-time" checked={filters.type === 'Full-time'} onChange={() => toggleType('Full-time')} />
                    <Checkbox label="Part-time" checked={filters.type === 'Part-time'} onChange={() => toggleType('Part-time')} />
                    <Checkbox label="Contract" checked={filters.type === 'Contract'} onChange={() => toggleType('Contract')} />
                    <Checkbox label="Internship" checked={filters.type === 'Internship'} onChange={() => toggleType('Internship')} />
                </FilterSection>

                <FilterSection title="Remote Options">
                    <Checkbox label="Remote" checked={false} onChange={() => { }} />
                    <Checkbox label="Hybrid" checked={false} onChange={() => { }} />
                    <Checkbox label="Onsite" checked={false} onChange={() => { }} />
                </FilterSection>

                <FilterSection title="Experience Level">
                    <Checkbox label="Entry Level" checked={false} onChange={() => { }} />
                    <Checkbox label="Mid Level" checked={false} onChange={() => { }} />
                    <Checkbox label="Senior" checked={false} onChange={() => { }} />
                </FilterSection>

            </div>
        </div>
    );
};

export default Filters;
