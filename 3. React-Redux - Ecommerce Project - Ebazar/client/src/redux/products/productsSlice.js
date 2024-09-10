import { createSlice } from '@reduxjs/toolkit';
import {
    fetchProductsAsync,
    fetchProductByIdAsync,
    fetchProductsByFiltersAsync,
    fetchBrandsAsync,
    fetchCategoriesAsync,
    createProductAsync,
    editProductAsync,
} from './productsThunks';

const initialState = {
    products: [],
    brands: [],
    categories: [],
    totalItems: 0,
    selectedProduct: null,
    newProduct: null,
    status: 'idle',
};




export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetNewProduct: (state) => {
            state.newProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action.payload;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action.payload;
            })
            .addCase(createProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products.push(action.payload);
                state.newProduct = action.payload;
            })
            .addCase(editProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.products.findIndex(item => item.id === action.payload.id)
                state.products.splice(index, 1, action.payload)
                state.newProduct = action.payload;
            })

    },
});







export default productsSlice.reducer;
