import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import jobsService from '../api/jobs.service';
import { toast } from 'react-hot-toast';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
    });

    const debouncedSearch = useDebounce(filters.search, 500);

    // Sync filters to URL
    useEffect(() => {
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.location) params.location = filters.location;
        if (filters.type) params.type = filters.type;
        setSearchParams(params);
    }, [filters, setSearchParams]);

    // Fetch Jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                // Pass current filters to service
                // ensure debounced value is used for search
                const queryFilters = {
                    ...filters,
                    search: debouncedSearch
                };

                const res = await jobsService.getJobs(queryFilters);
                if (res.success) {
                    setJobs(res.data); // Assuming backend returns { success: true, data: [] }
                }
            } catch (err) {
                console.error("Failed to fetch jobs", err);
                setError("Could not load jobs. Please try again.");
                // toast.error("Failed to fetch jobs"); // Optional: Might be too noisy on initial load
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [debouncedSearch, filters.location, filters.type]);
    // Trigger fetch when these change

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ search: '', location: '', type: '' });
    };

    return (
        <JobContext.Provider value={{ jobs, loading, error, filters, updateFilter, clearFilters }}>
            {children}
        </JobContext.Provider>
    );
};
