import { Search, MapPin, Filter } from 'lucide-react';
import { useJobs } from '../../context/JobContext';

const SearchBar = () => {
    const { filters, updateFilter } = useJobs();

    return (
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-2 lg:flex-row">

            {/* Search Input */}
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-900/50 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500/50 transition">
                <Search className="h-5 w-5 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search details..."
                    className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                />
            </div>

            {/* Location Input */}
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-900/50 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500/50 transition">
                <MapPin className="h-5 w-5 text-slate-500" />
                <input
                    type="text"
                    placeholder="Location"
                    className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 lg:w-auto">
                Search
            </button>

            {/* Mobile Filter Toggle */}
            <button className="flex lg:hidden items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-bold text-white">
                <Filter className="h-5 w-5" />
            </button>

        </div>
    );
};

export default SearchBar;
