import { createSlice } from "@reduxjs/toolkit";

const cartsProductSlice = createSlice({
    name: 'cartsProduct',
    initialState: {
        cart: null
    },
    reducers: {
        addCartProduct: (state, actions) => {
            state.cart = actions.payload
        }
    }
})

export default cartsProductSlice;