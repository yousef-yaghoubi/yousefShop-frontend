import { configureStore } from '@reduxjs/toolkit'
import allProductSlice from './allProductSlice'
import cartsProductSlice from './cartsProductSlice'
import authSlice from './authSlice'
import filterCategorySlice from './filterCategorySlice'

export const store = configureStore({
  reducer: {
    allProducts: allProductSlice.reducer,
    cartsProduct: cartsProductSlice.reducer,
    auth: authSlice.reducer,
    category: filterCategorySlice.reducer
  },
})