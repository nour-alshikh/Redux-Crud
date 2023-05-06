import usePostDetails from '../hooks/use-post-details'
import Loading from '../components/Loading'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Details() {
    const { loading, error, record } = usePostDetails();

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch({ type: "posts/clearRecord" })
        }
    }, [dispatch])

    return (
        <>
            <Loading loading={loading} error={error}>
                <p>Title : {record?.title}</p>
                <p>Description : {record?.description}</p>
            </Loading>
        </>
    )
}

export default Details
