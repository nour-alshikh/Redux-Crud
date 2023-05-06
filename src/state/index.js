import { configureStore } from "@reduxjs/toolkit";
import posts from './slices/PostSlice'
import user from './slices/UserSlice'

const store = configureStore({ reducer: { posts, user } })

export default store