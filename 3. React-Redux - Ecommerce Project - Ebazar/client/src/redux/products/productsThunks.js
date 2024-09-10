import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchProducts,
    fetchProductsById,
    fetchProductsByFilters,
    fetchBrands,
    fetchCategories,
    createProduct,
    editProduct,
} from "../../api";

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetchProducts();
        return response;
    }
);

export const fetchProductByIdAsync = createAsyncThunk(
    'products/fetchProductsById',
    async (id) => {
        const response = await fetchProductsById(id);
        return response;
    }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    'products/fetchProductsByFilters',
    async ({ role, filter, sort, pagination }) => {
        const response = await fetchProductsByFilters(role, filter, sort, pagination);
        return response;
    }
);

export const fetchBrandsAsync = createAsyncThunk(
    'products/fetchBrands',
    async () => {
        const response = await fetchBrands();
        return response;
    }
);

export const fetchCategoriesAsync = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const response = await fetchCategories();
        return response;
    }
);

//admin
export const createProductAsync = createAsyncThunk(
    'products/createProduct',
    async (product) => {
        const response = await createProduct(product);
        return response;
    }
);

export const editProductAsync = createAsyncThunk(
    'products/editProduct',
    async (product) => {
        const response = await editProduct(product);
        return response;
    }
);