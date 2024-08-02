import { createSlice } from "@reduxjs/toolkit";

const allProductSlice = createSlice({
    name: 'allProduct',
    initialState: {
        allProduct: null
    },
    reducers: {
        addProductInAll: (state, actions) => {
            state.allProduct = actions.payload
        }
    }
})

export default allProductSlice;