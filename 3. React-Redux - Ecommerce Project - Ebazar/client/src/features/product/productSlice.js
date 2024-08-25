import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductsByFilters, fetchCategories, fetchBrands, fetchProductsById, createProduct, editProduct } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  selectedProduct: null,
  newProduct:null,
  status: 'idle',
};

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
        state.newProduct=action.payload;
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.products.findIndex(item=>item.id===action.payload.id)
        state.products.splice(index, 1, action.payload)
        state.newProduct=action.payload;
      })

  },
});

export const { resetNewProduct } = productsSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectNewProduct = (state) => state.product.newProduct;


export default productsSlice.reducer;
