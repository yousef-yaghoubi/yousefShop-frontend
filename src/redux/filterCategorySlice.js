import { createSlice } from "@reduxjs/toolkit";

const filterCategorySlice = createSlice({
    name: 'filterCate',
    initialState:{
        filterCategory: 0
    },
    reducers: {
        editFilterCategory: (state, actions) => {
            state.filterCate = actions.payload
        }
    }
})

export default filterCategorySlice;