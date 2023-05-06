import React, { useCallback, useEffect } from 'react'
import PostList from '../components/PostList';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from '../state/slices/PostSlice'
import Loading from '../components/Loading';

function Index() {
    const dispatch = useDispatch();

    const { records, loading, error } = useSelector((state) => state.posts)
    const { isLoggedIn } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const deleteRecord = useCallback((id) => dispatch(deletePost(id)), [dispatch])

    return (
        <Loading loading={loading} error={error}>
            <PostList data={records} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn} />
        </Loading>
    )
}

export default Index
