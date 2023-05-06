import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, record: null }

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkApi) => {
    const { rejectedWithValue } = thunkApi
    try {
        const res = await fetch('http://localhost:5000/posts')
        const data = await res.json()
        return data;
    } catch (error) {
        return rejectedWithValue(error.message)
    }
})

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id, thunkApi) => {
    const { rejectedWithValue } = thunkApi
    try {
        const res = await fetch(`http://localhost:5000/posts/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        return rejectedWithValue(error.message)

    }
})

export const deletePost = createAsyncThunk("posts/deletePost", async (id, thunkApi) => {
    const { rejectedWithValue } = thunkApi
    try {
        await fetch(`http://localhost:5000/posts/${id}`, { method: 'DELETE' })
        return id
    } catch (error) {
        return rejectedWithValue(error.message)

    }
})

export const insertPost = createAsyncThunk("posts/insert", async (item, thunkApi) => {
    const { rejectedWithValue, getState } = thunkApi
    const { user } = getState()
    item.userId = user.id
    try {
        const res = await fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(item)
        })
        const data = await res.json()
        return data
    } catch (error) {
        return rejectedWithValue(error.message)
    }
})

export const editPost = createAsyncThunk("posts/edit", async (item, thunkApi) => {
    const { rejectedWithValue } = thunkApi
    try {
        const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(item)
        })
        const data = await res.json()
        return data
    } catch (error) {
        return rejectedWithValue(error.message)
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearRecord: (state) => {
            state.record = null
        }
    },
    extraReducers: {
        //Fetching Post
        [fetchPost.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.loading = false
            state.record = action.payload
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        //Fetching Posts
        [fetchPosts.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.records = action.payload
        },
        [fetchPosts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // Deleteing Post
        [deletePost.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false
            state.records = state.records.filter(e => e.id !== action.payload)
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // insert Record
        [insertPost.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [insertPost.fulfilled]: (state, action) => {
            state.loading = false
            state.records.push(action.payload)
        },
        [insertPost.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // Edit Record
        [editPost.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [editPost.fulfilled]: (state, action) => {
            state.loading = false
            state.record = action.payload;
        },
        [editPost.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }

    }
})

export default postSlice.reducer;