import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // authorization: JSON.parse(localStorage.getItem('profile')) ? JSON.parse(localStorage.getItem('profile')) : null
        authorization: null
    },
    reducers: {
        addAuth: (state, actions) => {
            state.authorization = actions.payload
        }
    }
})

export default authSlice;