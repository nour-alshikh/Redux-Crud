import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { id: 1, isLoggedIn: true },
    reducers: {},
})



export default userSlice.reducer