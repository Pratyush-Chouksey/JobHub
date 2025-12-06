import { setAllJobs, setTotalPages } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = (page = 1, limit = 15) => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}&page=${page}&limit=${limit}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                    dispatch(setTotalPages(res.data.totalPages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [searchedQuery, page, limit, dispatch])
}

export default useGetAllJobs