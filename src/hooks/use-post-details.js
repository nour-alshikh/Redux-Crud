import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPost } from '../state/slices/PostSlice'

const usePostDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { record, loading, error } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchPost(id))
    }, [dispatch, id])

    return { loading, error, record }
}

export default usePostDetails;